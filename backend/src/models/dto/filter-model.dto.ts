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
    @IsString()
    offset?: string;

    @IsOptional()
    @IsString()
    limit?: string;
}
