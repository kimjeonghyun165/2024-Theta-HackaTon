import { Controller, Post, Body, Get, UseGuards, Req, Res, BadRequestException, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { Response } from 'express';
import { SetPasswordDto } from './dto/password.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard.ts';
import { LoginDto } from './dto/login.dto';

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
            res.status(500).send('Authentication failed');
        }
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        try {
            return await this.authService.login(loginDto);
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<RegisterDto> {
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
        @Body('email') email: string,
        @Body('action') action: 'register' | 'resend' | 'resetPassword'
    ): Promise<{ success: boolean }> {
        try {
            await this.authService.sendOrResendVerificationCode(email, action);
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
            const jwtData = await this.authService.verifyCode(verifyEmailDto.email, verifyEmailDto.code);
            return { success: true, accessToken: jwtData.accessToken };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException('An error occurred during verification.');
        }
    }

    @UseGuards(JwtAuthGuard)
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
