import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { SetPasswordDto } from './dto/password.dto';
import { RegisterDto } from './dto/register.dto';
import { EmailService } from './email.service';
import * as bcrypt from 'bcrypt';

interface VerificationCodeDetails {
    code: string;
    expiresIn: number;
    hmac: string;
}

@Injectable()
export class AuthService {
    private readonly secretKey = process.env.EMAIL_SECRET;

    constructor(
        private readonly usersService: UsersService,
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService,
    ) { }

    async googleLogin(user: any): Promise<{ access_token: string }> {
        const createUserDto: CreateUserDto = {
            username: user.firstName + ' ' + user.lastName,
            email: user.email,
            isEmailVerified: user.email_verified,
            profileImg: user.photo,
        };
        const userData = await this.usersService.findOrCreateUser(createUserDto);

        if (!userData) {
            throw new Error('User authentication failed.');
        }
        const payload = { email: userData.email, sub: userData._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(registerDto: RegisterDto): Promise<void> {
        const createUserDto = {
            username: registerDto.username,
            email: registerDto.email,
            isEmailVerified: false
        };

        try {
            await this.usersService.findOrCreateUser(createUserDto, false);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException('Email already in use');
            }
            throw new BadRequestException('An error occurred during registration. Please try again.');
        }
    }

    async sendOrResendVerificationCode(email: string, action: 'register' | 'resend' | 'resetPassword'): Promise<void> {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (action === 'register') {

            if (user.isEmailVerified) {
                throw new BadRequestException('Email is already verified');
            }

            if (user.password) {
                throw new BadRequestException('Password already exists. Registration is not allowed.');
            }

            const currentTime = Date.now();
            if (user.verificationCodeDetails && user.verificationCodeDetails.expiresIn > currentTime) {
                throw new BadRequestException('Verification code is still valid. Please wait before requesting a new one.');
            }
        } else if (action === 'resetPassword') {

            if (!user.isEmailVerified) {
                throw new BadRequestException('Email is not verified. Password reset is not allowed.');
            }

            if (!user.password) {
                throw new BadRequestException('No password exists for this user. Password reset is not allowed.');
            }
        }

        const verificationCodeDetails = this.generateVerificationCode(email);

        await this.usersService.updateUser(user._id, {
            verificationCodeDetails: verificationCodeDetails,
        });

        await this.emailService.sendVerificationCode(user.email, verificationCodeDetails.code);
    }



    async verifyCode(email: string, code: string): Promise<{ accessToken: string }> {
        const user = await this.usersService.findByEmail(email);

        if (!user || !user.verificationCodeDetails) {
            throw new BadRequestException('Invalid or expired verification code');
        }

        const { verificationCodeDetails } = user;

        if (Date.now() > verificationCodeDetails.expiresIn) {
            throw new BadRequestException('Verification code has expired');
        }

        const hmac = createHmac('sha256', this.secretKey)
            .update(`${email}.${code}.${verificationCodeDetails.expiresIn}`)
            .digest('hex');

        if (hmac !== verificationCodeDetails.hmac) {
            throw new BadRequestException('Invalid or expired verification code');
        }

        await this.usersService.updateUser(user._id, { isEmailVerified: true });

        const payload = { email: user.email, sub: user._id };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '10m' });

        return { accessToken };
    }


    async setPassword(userId: string, setPasswordDto: SetPasswordDto): Promise<void> {
        const { password, confirmPassword } = setPasswordDto;

        if (password !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            await this.usersService.updateUser(userId, { password: hashedPassword });
        } catch (error) {
            console.error('Error hashing password:', error);
            throw new InternalServerErrorException('An error occurred while setting the password.');
        }
    }

    private generateVerificationCode(email: string): VerificationCodeDetails {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresIn = Date.now() + 5 * 60 * 1000;
        const hmac = createHmac('sha256', this.secretKey)
            .update(`${email}.${code}.${expiresIn}`)
            .digest('hex');
        return {
            code,
            expiresIn,
            hmac
        };
    }
}
