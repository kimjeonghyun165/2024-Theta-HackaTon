import { Controller, Post, Body, Get, UseGuards, Req, Res, BadRequestException, NotFoundException, InternalServerErrorException, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SendVerificationCodeDto, VerifyEmailDto } from './dto/verify-email.dto';
import { Response } from 'express';
import { SetPasswordDto } from './dto/password.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard.ts';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { TokenTypeGuard } from 'src/common/guards/token-type.guard';
import { TokenType } from 'src/common/decorators/token-type.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Get('google/login')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
    }

    @Get('oauth2/redirect/google')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res: Response) {
        try {
            const jwt = await this.authService.googleLogin(req.user);
            const redirectUrl = `${process.env.FRONTEND_URL}/auth-complete.html?token=${encodeURIComponent(jwt.access_token)}`;
            res.redirect(redirectUrl);
        } catch (error) {
            Logger.error('Google OAuth2 redirect failed', error.stack, 'AuthController');
            res.status(500).json({
                message: 'Authentication failed',
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            });
        }
    }


    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        try {
            return await this.authService.login(loginDto);
        } catch (error) {
            Logger.error(`Login failed: ${error.message}`, error.stack, 'AuthController');
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException('Invalid credentials');
            } else if (error instanceof BadRequestException) {
                throw new BadRequestException('Invalid login data');
            } else {
                throw new InternalServerErrorException('An unexpected error occurred. Please try again later.');
            }
        }
    }

    @Post('register')
    async register(@Body() registerDto: RegisterUserDto): Promise<RegisterUserDto> {
        try {
            await this.authService.register(registerDto);
            return registerDto
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException('Email already in use');
            }
            throw error;
        }
    }

    @Post('send-verification-code')
    async sendVerificationCode(
        @Body() sendVerificationCodeDto: SendVerificationCodeDto
    ): Promise<{ success: boolean }> {
        try {
            await this.authService.sendOrResendVerificationCode(sendVerificationCodeDto);
            return { success: true };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new BadRequestException('The provided email address is not associated with any account.');
            } else if (error instanceof BadRequestException) {
                throw error;
            } else {
                throw new InternalServerErrorException('An unexpected error occurred while processing your request. Please try again later.');
            }
        }
    }

    @Post('verify-email')
    async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto): Promise<{ success: boolean, accessToken: string }> {
        try {
            const jwtData = await this.authService.verifyCode(verifyEmailDto);
            return { success: true, accessToken: jwtData.accessToken };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException('An error occurred during verification.');
        }
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @TokenType('verify')
    @Post('set-password')
    async setPassword(@Req() req, @Body() setPasswordDto: SetPasswordDto): Promise<{ success: boolean }> {
        try {
            await this.authService.setPassword(req.user.userId, setPasswordDto);
            return { success: true }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException('An error occurred during set password. please try again');
        }

    }
}
