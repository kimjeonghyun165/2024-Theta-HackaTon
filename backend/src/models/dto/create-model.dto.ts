import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsBoolean, IsEnum, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

class StyleDto {
    @IsString()
    @IsEnum(['lowpoly', 'realistic'])
    method: 'lowpoly' | 'realistic';

    @IsOptional()
    @IsString()
    @IsEnum(['low', 'mid', 'high'])
    strength?: 'low' | 'mid' | 'high';

    @IsOptional()
    @IsBoolean()
    superResolution?: boolean;
}

class nftDetailsDto {
    @IsBoolean()
    isNft: boolean;

    @IsOptional()
    @IsString()
    ipfsFile?: string;

    @IsOptional()
    @IsString()
    ipfsMetadata?: string;

    @IsOptional()
    @IsBoolean()
    isListed?: boolean;

    @IsOptional()
    @IsNumber()
    price?: number;
}

export class CreateModelDto {
    @IsString()
    readonly prompt: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsObject({ each: true })
    readonly imgSelection: { url: string; selected: boolean }[];

    @IsString()
    readonly selectedImage: string;

    @ValidateNested()
    @Type(() => StyleDto)
    readonly style: StyleDto;

    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly file: string;

    @IsString()
    readonly preview: string;

    @IsString()
    readonly visibility?: 'private' | 'public';

    @ValidateNested()
    @Type(() => nftDetailsDto)
    readonly nftDetails: nftDetailsDto
}
