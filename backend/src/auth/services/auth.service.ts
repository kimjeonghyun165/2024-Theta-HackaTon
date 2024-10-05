import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../../users/users.service';
import { SetPasswordDto } from '../dto/password.dto';
import { EmailService } from './email.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { RegisterUserDto } from '../dto/register.dto';
import {
  SendVerificationCodeDto,
  VerifyEmailDto,
} from '../dto/verify-email.dto';
import { HttpErrorException } from 'src/common/exceptions/http-error.exception.ts';
import {
  INVALID_CREDENTIALS,
  USER_NOT_FOUND,
  EMAIL_ALREADY_VERIFIED,
  PASSWORD_ALREADY_EXISTS,
  VERIFICATION_CODE_STILL_VALID,
  EMAIL_NOT_VERIFIED,
  NO_PASSWORD_EXISTS,
  PASSWORDS_DO_NOT_MATCH,
  VERIFICATION_CODE_INVALID,
  INTERNAL_SERVER_ERROR,
} from '../../common/exceptions/error.code';

@Injectable()
export class AuthService {
  private readonly secretKey = process.env.EMAIL_SECRET;

  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async ssoLogin(
    user: any,
    provider: 'google' | 'facebook' | 'apple',
  ): Promise<{ access_token: string }> {
    const createUserDto: CreateUserDto = {
      username: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };

    const userData = await this.usersService.findOrCreateUser(
      createUserDto,
      true,
      provider,
    );

    return {
      access_token: this.generateAccessToken(userData, 'login'),
    };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    const user = await this.validateUserCredentials(email, password);
    const payload = {
      email: user.email,
      type: 'login',
      status: user.status,
      sub: user._id,
    };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async register(registerDto: RegisterUserDto) {
    const createUserDto = {
      username: registerDto.username,
      email: registerDto.email,
      isEmailVerified: false,
    };

    try {
      await this.usersService.findOrCreateUser(createUserDto, false, 'email');
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR);
    }
  }

  async sendOrResendVerificationCode(
    sendVerificationCodeDto: SendVerificationCodeDto,
  ): Promise<void> {
    const { email, action } = sendVerificationCodeDto;
    const user = await this.usersService.findByEmailforPassword(email);
    if (!user) {
      throw new HttpErrorException(USER_NOT_FOUND);
    }

    if (action === 'register') {
      if (user.loginMethod.isEmailVerified) {
        throw new HttpErrorException(EMAIL_ALREADY_VERIFIED);
      }

      if (user.loginMethod.password) {
        throw new HttpErrorException(PASSWORD_ALREADY_EXISTS);
      }

      const currentTime = Date.now();
      if (
        user.loginMethod.verificationCodeDetails &&
        user.loginMethod.verificationCodeDetails.expiresIn > currentTime
      ) {
        throw new HttpErrorException(VERIFICATION_CODE_STILL_VALID);
      }
    } else if (action === 'resetPassword') {
      if (!user.loginMethod.isEmailVerified) {
        throw new HttpErrorException(EMAIL_NOT_VERIFIED);
      }

      if (!user.loginMethod.password) {
        throw new HttpErrorException(NO_PASSWORD_EXISTS);
      }
    }

    const verificationCodeDetails = this.generateVerificationCode(email);
    await this.usersService.updateUser(user._id, {
      $set: {
        'loginMethod.verificationCodeDetails': verificationCodeDetails,
      },
    });
    await this.emailService.sendVerificationCode(
      user.email,
      verificationCodeDetails.code,
      action,
    );
  }

  async verifyCode(
    verifyEmailDto: VerifyEmailDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(verifyEmailDto.email);

    if (!user || !user.loginMethod.verificationCodeDetails) {
      throw new HttpErrorException(VERIFICATION_CODE_INVALID);
    }

    const { verificationCodeDetails } = user.loginMethod;

    if (Date.now() > verificationCodeDetails.expiresIn) {
      throw new HttpErrorException(VERIFICATION_CODE_INVALID);
    }

    const hmac = createHmac('sha256', this.secretKey)
      .update(
        `${verifyEmailDto.email}.${verifyEmailDto.code}.${verificationCodeDetails.expiresIn}`,
      )
      .digest('hex');

    if (hmac !== verificationCodeDetails.hmac) {
      throw new HttpErrorException(VERIFICATION_CODE_INVALID);
    }

    await this.usersService.updateUser(user._id, {
      $set: { 'loginMethod.isEmailVerified': true },
    });

    return { accessToken: this.generateAccessToken(user, 'verify', '10m') };
  }

  async setPassword(
    userId: string,
    setPasswordDto: SetPasswordDto,
  ): Promise<void> {
    const { password, confirmPassword } = setPasswordDto;

    if (password !== confirmPassword) {
      throw new HttpErrorException(PASSWORDS_DO_NOT_MATCH);
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.usersService.updateUser(userId, {
        $set: { 'loginMethod.password': hashedPassword },
      });
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR);
    }
  }

  private generateVerificationCode(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresIn = Date.now() + 5 * 60 * 1000;
    const hmac = createHmac('sha256', this.secretKey)
      .update(`${email}.${code}.${expiresIn}`)
      .digest('hex');
    return {
      code,
      expiresIn,
      hmac,
    };
  }

  private generateAccessToken(
    user: any,
    type: string,
    expiresIn?: string,
  ): string {
    const payload = {
      email: user.email,
      sub: user._id.toString(),
      status: user.status,
      type: type,
    };
    return expiresIn
      ? this.jwtService.sign(payload, { expiresIn })
      : this.jwtService.sign(payload);
  }

  private async validateUserCredentials(email: string, password: string) {
    const user = await this.usersService.findByEmailforPassword(email);
    if (!user) {
      throw new HttpErrorException(INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.loginMethod.password,
    );
    if (!isPasswordValid) {
      throw new HttpErrorException(INVALID_CREDENTIALS);
    }

    return user;
  }
}
