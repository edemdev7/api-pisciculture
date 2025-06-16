import { IsNotEmpty, IsNumber, IsOptional, IsDate, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStockDto {
  @IsNotEmpty()
  @IsNumber()
  intrant_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantite: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date_expiration?: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  seuil_alerte: number;
} 