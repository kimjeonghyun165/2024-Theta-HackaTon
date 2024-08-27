import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

class StyleDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(['lowpoly', 'realistic'])
    method: 'lowpoly' | 'realistic';

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsEnum(['low', 'mid', 'high'])
    strength?: 'low' | 'mid' | 'high';

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    superResolution?: boolean;
}

export class CreateModelDto {
    @IsString()
    @IsNotEmpty()
    readonly prompt: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsObject({ each: true })
    readonly imgSelection: { url: string; selected: boolean }[];

    @IsString()
    @IsNotEmpty()
    readonly selectedImage: string;

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => StyleDto)
    readonly style: StyleDto;

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly file: string;

    @IsString()
    @IsNotEmpty()
    readonly preview: string;

    @IsString()
    @IsNotEmpty()
    readonly visibility?: 'private' | 'public';

    @IsBoolean()
    @IsNotEmpty()
    readonly listing: boolean;

    @IsOptional()
    @IsNumber()
    readonly price: number
}
