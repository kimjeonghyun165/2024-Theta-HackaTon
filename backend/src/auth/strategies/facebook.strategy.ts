import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyFunction } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor() {
        super({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.BACKEND_URL + 'api/auth/facebook/redirect',
            profileFields: ['name', 'emails', 'photos'],
            scope: ['email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
        try {
            const { name, emails, photos } = profile;
            const user = {
                email: emails[0].value,
                firstName: name.givenName,
                lastName: name.familyName,
                photo: photos[0].value,
                email_verified: !!emails[0].value,
            };
            done(null, user);
        }
        catch (error) {
            done(error)
        }
    }
}
