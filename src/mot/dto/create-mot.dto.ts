import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateMotDto {
  @IsString()
  fr: string;

  @IsString()
  kr: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsArray()
  @IsOptional()
  variantes?: string[];

  @IsOptional()
  exemples?: { fr: string; kr: string }[];

  @IsOptional()
  validé?: boolean;
}
