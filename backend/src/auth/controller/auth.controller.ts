import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { SendVerificationCodeDto, VerifyEmailDto } from '../dto/verify-email.dto';
import { SetPasswordDto } from '../dto/password.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { LoginDto } from '../dto/login.dto';
import { RegisterUserDto } from '../dto/register.dto';
import { TokenTypeGuard } from 'src/common/guards/token-type.guard';
import { TokenType } from 'src/common/decorators/token-type.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Get('google/login')
    @UseGuards(AuthGuard('google'))
    async googleAuth() { }

    @Get('oauth2/redirect/google')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req): Promise<{ redirectUrl: string }> {
        const jwt = await this.authService.ssoLogin(req.user, 'google');
        return {
            redirectUrl: `${process.env.FRONTEND_URL}/auth-complete.html?token=${encodeURIComponent(jwt.access_token)}`
        };
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        return this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterUserDto): Promise<RegisterUserDto> {
        await this.authService.register(registerDto);
        return registerDto;
    }

    @Post('send-verification-code')
    async sendVerificationCode(@Body() sendVerificationCodeDto: SendVerificationCodeDto): Promise<{ success: boolean }> {
        await this.authService.sendOrResendVerificationCode(sendVerificationCodeDto);
        return { success: true };
    }

    @Post('verify-email')
    async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto): Promise<{ success: boolean, accessToken: string }> {
        const jwtData = await this.authService.verifyCode(verifyEmailDto);
        return { success: true, accessToken: jwtData.accessToken };
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @TokenType('verify')
    @Post('set-password')
    async setPassword(@Req() req, @Body() setPasswordDto: SetPasswordDto): Promise<{ success: boolean }> {
        await this.authService.setPassword(req.user.userId, setPasswordDto);
        return { success: true };
    }
}

