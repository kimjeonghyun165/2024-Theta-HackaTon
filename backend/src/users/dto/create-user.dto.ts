import { IsString, IsOptional, IsEnum, IsUrl, IsArray, IsMongoId, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
    @IsString()
    readonly address: string;

    @IsOptional()
    @IsString()
    readonly username?: string;

    @IsOptional()
    @IsString()
    readonly email?: string;

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
