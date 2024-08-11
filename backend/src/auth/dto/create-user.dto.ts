import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly profileImg: string;
}
