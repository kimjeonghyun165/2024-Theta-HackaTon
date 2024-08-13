import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3060/api/auth/oauth2/redirect/google',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    try {
      const { name, emails, photos } = profile;
      console.log('🚀 🔶 GoogleStrategy 🔶 validate 🔶 profile:', profile);
      const user = {
        email: emails[0].value,
        firstName: name.familyName,
        lastName: name.givenName,
        photo: photos[0].value,
        email_verified: emails[0].verified
      };
      console.log('🚀 🔶 GoogleStrategy 🔶 validate 🔶 user:', user);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
