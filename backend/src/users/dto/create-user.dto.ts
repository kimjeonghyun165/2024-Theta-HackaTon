import { IsString, IsOptional, IsEnum, IsUrl, IsArray, IsMongoId, IsNumber, IsBoolean, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsBoolean()
    @IsNotEmpty()
    isEmailVerified: boolean;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: 'Password too weak' })
    readonly password?: string;

    @IsString()
    @IsOptional()
    readonly plan?: string;

    @IsNumber()
    @IsOptional()
    readonly credits?: number;

    @IsOptional()
    @IsUrl()
    readonly profileImg?: string;

    @IsOptional()
    @IsUrl()
    readonly representativeModel?: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    readonly models?: Types.ObjectId[];

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    readonly likedModels?: Types.ObjectId[];

    @IsOptional()
    @IsEnum(['active', 'inactive', 'banned'])
    readonly status?: 'active' | 'inactive' | 'banned';
}
