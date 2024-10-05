import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

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
  like?: number;

  @IsOptional()
  @IsEnum(['private', 'public'])
  visibility?: 'private' | 'public';

  @IsOptional()
  @IsBoolean()
  listing?: boolean;

  @IsOptional()
  @IsNumber()
  price?: number;
}
