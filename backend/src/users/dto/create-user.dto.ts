import { IsString, IsOptional, IsUrl, IsNotEmpty, MinLength, Matches, } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsOptional()
    @IsUrl()
    readonly profileImg?: string;
}
