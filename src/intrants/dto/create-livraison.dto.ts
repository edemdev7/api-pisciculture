import { IsNumber, IsNotEmpty, IsDate, IsString, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLivraisonDto {
  @IsNumber()
  @IsNotEmpty()
  bassin_id: number;

  @IsNumber()
  @IsNotEmpty()
  intrant_id: number;

  @IsNumber()
  @Min(0)
  quantite: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date_prevue: Date;

  @IsNumber()
  @IsNotEmpty()
  pisciculteur_id: number;

  @IsString()
  @IsOptional()
  commentaire?: string;
} 