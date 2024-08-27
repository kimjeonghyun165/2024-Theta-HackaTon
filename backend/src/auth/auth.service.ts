import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { SetPasswordDto } from './dto/password.dto';
import { EmailService } from './email.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { SendVerificationCodeDto, VerifyEmailDto } from './dto/verify-email.dto';

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
        const payload = { email: userData.email, type: 'login', sub: userData._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const { email, password } = loginDto;

        try {
            const user = await this.usersService.findByEmailforPassword(email);
            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const payload = { email: user.email, type: "login", sub: user._id };
            const accessToken = this.jwtService.sign(payload);

            return { accessToken };
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            } else {
                throw new InternalServerErrorException('An error occurred during login');
            }
        }
    }

    async register(registerDto: RegisterUserDto): Promise<void> {
        const regiserUserDto = {
            username: registerDto.username,
            email: registerDto.email,
            isEmailVerified: false
        };

        try {
            await this.usersService.findOrCreateUser(regiserUserDto, false);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException('Email already in use');
            }
            throw new BadRequestException('An error occurred during registration. Please try again.');
        }
    }

    async sendOrResendVerificationCode(sendVerificationCodeDto: SendVerificationCodeDto): Promise<void> {
        const { email, action } = sendVerificationCodeDto
        const user = await this.usersService.findByEmailforPassword(email)
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



    async verifyCode(verifyEmailDto: VerifyEmailDto): Promise<{ accessToken: string }> {
        const user = await this.usersService.findByEmail(verifyEmailDto.email);

        if (!user || !user.verificationCodeDetails) {
            throw new BadRequestException('Invalid or expired verification code');
        }

        const { verificationCodeDetails } = user;

        if (Date.now() > verificationCodeDetails.expiresIn) {
            throw new BadRequestException('Verification code has expired');
        }

        const hmac = createHmac('sha256', this.secretKey)
            .update(`${verifyEmailDto.email}.${verifyEmailDto.code}.${verificationCodeDetails.expiresIn}`)
            .digest('hex');

        if (hmac !== verificationCodeDetails.hmac) {
            throw new BadRequestException('Invalid or expired verification code');
        }

        await this.usersService.updateUser(user._id, { isEmailVerified: true });

        const payload = { email: user.email, type: "verify", sub: user._id };
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

    private generateVerificationCode(email: string) {
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
