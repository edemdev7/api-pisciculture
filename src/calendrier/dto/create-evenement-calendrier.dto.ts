import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsEnum, IsString, IsOptional, IsDateString } from 'class-validator';
import { TypeEvenement } from '../entities/evenement-calendrier.entity';

export class CreateEvenementCalendrierDto {
  @ApiProperty({ description: 'ID du pisciculteur' })
  @IsNumber()
  pisciculteur_id: number;

  @ApiProperty({ enum: TypeEvenement, description: 'Type d\'événement' })
  @IsEnum(TypeEvenement)
  type: TypeEvenement;

  @ApiPropertyOptional({ description: 'Description de l\'événement' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Date de début', type: String, format: 'date-time' })
  @IsDateString()
  date_debut: Date;

  @ApiPropertyOptional({ description: 'Date de fin', type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  date_fin?: Date;
} 