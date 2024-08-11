import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('google/login')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        console.log('GET google/login - googleAuth 실행');
    }

    // @Get('oauth2/redirect/google')
    // @UseGuards(AuthGuard('google'))
    // async googleAuthRedirect(@Req() req, @Res() res) {
    //     console.log('GET oauth2/redirect/google - googleAuthRedirect 실행');
    //     try {
    //         const jwt = await this.authService.login(req.user);
    //         res.cookie('JWT', jwt.access_token, {
    //             httpOnly: true,
    //             secure: true,
    //             sameSite: 'strict'
    //         }); // -> 쿠키에 저장하지말고 로컬 스토리지에 저장하고 싶다.
    //         res.redirect(`${process.env.FRONTEND_URL}`);
    //     } catch (error) {
    //         console.error('로그인 처리 중 오류 발생:', error);
    //         res.status(500).send('Authentication failed');
    //     }
    // }


    @Get('oauth2/redirect/google')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res) {
        console.log('GET oauth2/redirect/google - googleAuthRedirect 실행');
        try {
            const jwt = await this.authService.login(req.user);
            const redirectUrl = `${process.env.FRONTEND_URL}/auth-complete.html?token=${encodeURIComponent(jwt.access_token)}`;
            res.redirect(redirectUrl);
        } catch (error) {
            console.error('로그인 처리 중 오류 발생:', error);
            res.status(500).send('Authentication failed');
        }
    }
}
