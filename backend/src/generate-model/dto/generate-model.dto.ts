import { IsString, IsBoolean, IsOptional, IsUrl } from 'class-validator';

export class GenerateRealisticModelRequestDto {
    @IsString()
    readonly imageUrl: string;

    @IsBoolean()
    readonly superResolution: boolean;
}

export class GenerateLowPolyModelRequestDto {
    @IsString()
    readonly imageUrl: string;

    @IsString()
    readonly lowPolyStrength: string;
}

export class GenerateImageRequestDto {
    @IsString()
    readonly prompt: string;
}

export class GenerateModelRequestDto {
    @IsOptional()
    readonly realistic?: GenerateRealisticModelRequestDto;

    @IsOptional()
    readonly lowPoly?: GenerateLowPolyModelRequestDto;

    @IsOptional()
    readonly image?: GenerateImageRequestDto;
}
