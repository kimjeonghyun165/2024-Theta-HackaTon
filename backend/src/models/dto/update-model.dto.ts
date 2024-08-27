import { IsOptional, IsString, IsObject, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateModelDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    like?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    visibility?: 'private' | 'public';

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    listing: boolean

    @IsOptional()
    @IsNumber()
    price?: number
}
