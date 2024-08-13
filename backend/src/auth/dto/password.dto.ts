import { IsString, MinLength, Matches } from 'class-validator';

export class SetPasswordDto {
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: 'Password too weak' })
    readonly password: string;

    @IsString()
    readonly confirmPassword: string;
}
