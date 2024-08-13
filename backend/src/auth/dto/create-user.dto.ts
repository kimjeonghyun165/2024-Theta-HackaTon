import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly isEmailVerified: boolean;

    @IsOptional()
    @IsString()
    readonly profileImg: string;
}