import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

enum Method {
  LOWPOLY = 'lowpoly',
  REALISTIC = 'realistic',
}

enum Strength {
  LOW = 'low',
  MID = 'mid',
  HIGH = 'high',
}

enum Visibility {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

class StyleDto {
  @IsEnum(Method)
  method: Method;

  @IsOptional()
  @IsEnum(Strength)
  strength?: Strength;

  @IsOptional()
  @IsBoolean()
  superResolution?: boolean = false; // 기본값 설정
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

  @IsOptional()
  @IsEnum(Visibility)
  readonly visibility?: Visibility;

  @IsBoolean()
  @IsNotEmpty()
  readonly listing: boolean;

  @IsOptional()
  @IsNumber()
  readonly price?: number;
}
