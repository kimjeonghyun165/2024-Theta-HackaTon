import { IsString, IsOptional, IsNumber, IsEnum, IsArray, IsMongoId, IsUrl } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    readonly username?: string;

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
