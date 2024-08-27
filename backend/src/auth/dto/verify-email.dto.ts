import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    code: string;
}


export class SendVerificationCodeDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(['register', 'resend', 'resetPassword'])
    @IsNotEmpty()
    action: 'register' | 'resend' | 'resetPassword';
}