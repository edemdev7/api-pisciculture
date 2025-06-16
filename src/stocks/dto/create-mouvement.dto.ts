import { IsNotEmpty, IsNumber, IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { TypeMouvement } from '../entities/mouvement-stock.entity';

export class CreateMouvementDto {
  @IsNotEmpty()
  @IsNumber()
  stock_id: number;

  @IsNotEmpty()
  @IsEnum(TypeMouvement)
  type: TypeMouvement;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantite: number;

  @IsOptional()
  @IsString()
  commentaire?: string;
} 