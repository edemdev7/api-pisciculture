import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsEnum } from 'class-validator';
import { DetteStatut } from '../entities/dette.entity';

export class CreateDetteDto {
  @ApiProperty({ description: 'ID du pisciculteur' })
  @IsNumber()
  pisciculteur_id: number;

  @ApiProperty({ description: 'Montant initial de la dette' })
  @IsNumber()
  montant_initial: number;

  @ApiProperty({ description: 'Solde actuel de la dette' })
  @IsNumber()
  solde: number;

  @ApiPropertyOptional({ enum: DetteStatut, description: 'Statut de la dette' })
  @IsOptional()
  @IsEnum(DetteStatut)
  statut?: DetteStatut;
} 