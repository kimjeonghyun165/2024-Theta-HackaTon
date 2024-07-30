import { IsOptional, IsString, IsObject, IsNumber } from 'class-validator';

export class UpdateModelDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    like?: number;

    @IsOptional()
    @IsString()
    visibility?: 'private' | 'public';

    @IsOptional()
    @IsObject()
    nftDetails?: {
        isListed?: boolean;
        price?: number;
    };
}
