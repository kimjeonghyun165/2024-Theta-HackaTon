import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';

export class FilterModelDto {
    @IsOptional()
    @IsString()
    createdBy?: string;

    @IsOptional()
    @IsEnum(['private', 'public'])
    visibility?: 'private' | 'public';

    @IsOptional()
    @IsString()
    sortBy?: 'createdAt' | 'like';

    @IsOptional()
    @IsString()
    sortOrder?: 'asc' | 'desc';

    @IsOptional()
    @IsNumber()
    offset?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;
}
