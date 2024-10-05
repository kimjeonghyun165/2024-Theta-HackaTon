import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

enum Visibility {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

enum SortBy {
  CREATED_AT = 'createdAt',
  LIKE = 'like',
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class FilterModelDto {
  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsEnum(Visibility)
  visibility?: Visibility;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}
