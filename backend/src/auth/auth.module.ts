import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { EmailService } from './email.service';
import { TokenTypeGuard } from 'src/common/guards/token-type.guard';
import { SharedModule } from 'src/common/modules/shared.module';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    SharedModule,
    PassportModule.register({ defaultStrategy: 'facebook' })
  ],
  providers: [AuthService, EmailService, JwtStrategy, GoogleStrategy, TokenTypeGuard, FacebookStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
