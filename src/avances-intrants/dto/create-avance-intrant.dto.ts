import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { AvanceStatut } from '../entities/avance-intrant.entity';

export class CreateAvanceIntrantDto {
  @ApiProperty({ description: 'ID du pisciculteur' })
  @IsNumber()
  pisciculteur_id: number;

  @ApiPropertyOptional({ description: 'ID de la livraison d\'intrant' })
  @IsOptional()
  @IsNumber()
  livraison_id?: number;

  @ApiProperty({ description: 'Montant de l\'avance' })
  @IsNumber()
  montant: number;

  @ApiProperty({ description: 'Date de l\'avance', type: String, format: 'date-time' })
  @IsDateString()
  date: Date;

  @ApiPropertyOptional({ enum: AvanceStatut, description: 'Statut de l\'avance' })
  @IsOptional()
  @IsEnum(AvanceStatut)
  statut?: AvanceStatut;
} 