import { IsString, IsNumber, IsOptional, Min, IsEnum } from 'class-validator';
import { BassinStatus } from '../entities/bassin.entity';

export class UpdateBassinDto {
  @IsString()
  @IsOptional()
  nom?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  superficie?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  capacite_max?: number;

  @IsString()
  @IsOptional()
  type_poisson?: string;

  @IsEnum(BassinStatus)
  @IsOptional()
  statut?: BassinStatus;
} 