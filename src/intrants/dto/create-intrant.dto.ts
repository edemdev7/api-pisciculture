import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, Min } from 'class-validator';
import { IntrantType } from '../entities/intrant.entity';

export class CreateIntrantDto {
    @ApiProperty({ description: 'Nom de l\'intrant' })
    @IsString()
    nom: string;

    @ApiProperty({ description: 'Description de l\'intrant', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Type d\'intrant', enum: IntrantType })
    @IsEnum(IntrantType)
    type: IntrantType;

    @ApiProperty({ description: 'Unité de mesure de l\'intrant' })
    @IsString()
    unite_mesure: string;

    @ApiProperty({ description: 'Quantité disponible de l\'intrant' })
    @IsNumber()
    @Min(0)
    stock_disponible: number;

    @ApiProperty({ description: 'Prix unitaire de l\'intrant' })
    @IsNumber()
    @Min(0)
    prix_unitaire: number;

    @ApiProperty({ description: 'Seuil d\'alerte pour le stock' })
    @IsNumber()
    @Min(0)
    seuil_alerte: number;
} 