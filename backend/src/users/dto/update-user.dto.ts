import { IsString, IsOptional, IsNumber, IsEnum, IsArray, IsMongoId, IsUrl, IsBoolean, IsObject, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { Types } from 'mongoose';

class VerificationCodeDetailsDto {
    @IsString()
    readonly code: string;

    @IsNumber()
    readonly expiresIn: number;

    @IsString()
    readonly hmac: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    readonly username?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: 'Password too weak' })
    readonly password?: string;

    @IsOptional()
    @IsBoolean()
    readonly isEmailVerified?: boolean;

    @IsOptional()
    @IsObject()
    readonly verificationCodeDetails?: VerificationCodeDetailsDto;

    @IsOptional()
    @IsString()
    readonly plan?: string;

    @IsOptional()
    @IsNumber()
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
