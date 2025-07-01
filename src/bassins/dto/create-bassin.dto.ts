import { IsString, IsNumber, IsNotEmpty, Min, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBassinDto {
  @ApiProperty({ description: 'Nom du bassin' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ description: 'Superficie du bassin en m²' })
  @IsNumber()
  @Min(0)
  superficie: number;

  @ApiProperty({ description: 'Profondeur du bassin en m' })
  @IsNumber()
  @Min(0)
  profondeur: number;

  @ApiProperty({ description: 'Type de bassin' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Description du bassin', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Date de création du bassin' })
  @IsDate()
  @Type(() => Date)
  date_creation: Date;

  @ApiProperty({ description: 'ID de la région' })
  @IsNumber()
  region_id: number;
} 