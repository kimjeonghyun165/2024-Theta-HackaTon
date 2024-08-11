import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID, //페이스북 환경변수로 바꿔야함. 인증안됨 지금은.
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3060/api/auth/oauth2/redirect/facebook',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        try {
            const { name, emails, photos } = profile;
            const user = {
                email: emails[0].value,
                firstName: name.familyName,
                lastName: name.givenName,
                photo: photos[0].value,
            };
            done(null, user);
        } catch (error) {
            done(error);
        }
    }
}