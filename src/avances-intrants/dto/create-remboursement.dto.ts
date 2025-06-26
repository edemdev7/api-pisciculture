import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { RemboursementType } from '../entities/remboursement.entity';

export class CreateRemboursementDto {
  @ApiProperty({ description: 'ID de l\'avance concernée' })
  @IsNumber()
  avance_id: number;

  @ApiProperty({ description: 'ID du pisciculteur' })
  @IsNumber()
  pisciculteur_id: number;

  @ApiProperty({ description: 'Montant du remboursement' })
  @IsNumber()
  montant: number;

  @ApiProperty({ description: 'Date du remboursement', type: String, format: 'date-time' })
  @IsDateString()
  date: Date;

  @ApiPropertyOptional({ enum: RemboursementType, description: 'Type de remboursement' })
  @IsOptional()
  @IsEnum(RemboursementType)
  type?: RemboursementType;
} 