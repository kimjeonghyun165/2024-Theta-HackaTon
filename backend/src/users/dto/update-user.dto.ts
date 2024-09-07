import { IsString, IsOptional, IsNumber, IsEnum, IsArray, IsMongoId, IsUrl, IsBoolean, IsObject, IsNotEmpty, MinLength, Matches, ValidateNested, Min } from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { SurveyDto } from './survey.dto';

export class VerificationCodeDetailsUpdateDto {
    @IsString()
    @IsOptional()
    code?: string;

    @IsOptional()
    expiresIn?: number;

    @IsString()
    @IsOptional()
    hmac?: string;
}

export class LoginMethodUpdateDto {
    @IsEnum(['email', 'google', 'facebook', 'apple'])
    @IsOptional()
    method?: 'email' | 'google' | 'facebook' | 'apple';

    @IsString()
    @IsOptional()
    password?: string;


    @IsBoolean()
    @IsOptional()
    isEmailVerified?: boolean;

    @ValidateNested()
    @IsOptional()
    @Type(() => VerificationCodeDetailsUpdateDto)
    verificationCodeDetails?: VerificationCodeDetailsUpdateDto;
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
    readonly isSurveyCompleted?: boolean;

    @ValidateNested()
    @IsOptional()
    @Type(() => LoginMethodUpdateDto)
    readonly loginMethod?: LoginMethodUpdateDto;

    @IsOptional()
    @IsString()
    readonly plan?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    readonly credits?: number;

    @IsOptional()
    @IsUrl()
    readonly profileImg?: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    readonly models?: Types.ObjectId[];

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    readonly likedModels?: Types.ObjectId[];

    @IsOptional()
    @IsEnum(['pending', 'active', 'inactive', 'banned'])
    readonly status?: 'pending' | 'active' | 'inactive' | 'banned';

    @IsOptional()
    @ValidateNested()
    @Type(() => SurveyDto)
    readonly survey?: SurveyDto;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    readonly purchasedModels?: Types.ObjectId[];

    @IsOptional()
    @IsNumber()
    @Min(0)
    readonly totalLikesReceived?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    readonly totalSales?: number;
}
