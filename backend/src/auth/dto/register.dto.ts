import { IsString, IsNotEmpty, IsOptional, IsEmail, IsBoolean } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsBoolean()
    @IsOptional()
    @IsNotEmpty()
    readonly isEmailVerified?: boolean;

    @IsOptional()
    @IsString()
    readonly profileImg?: string;
}