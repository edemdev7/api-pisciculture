import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, Min } from 'class-validator';
import { IntrantType } from '../entities/intrant.entity';

export class UpdateIntrantDto {
    @ApiProperty({ description: 'Nom de l\'intrant', required: false })
    @IsString()
    @IsOptional()
    nom?: string;

    @ApiProperty({ description: 'Description de l\'intrant', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Type d\'intrant', enum: IntrantType, required: false })
    @IsEnum(IntrantType)
    @IsOptional()
    type?: IntrantType;

    @ApiProperty({ description: 'Unité de mesure de l\'intrant', required: false })
    @IsString()
    @IsOptional()
    unite_mesure?: string;

    @ApiProperty({ description: 'Quantité disponible de l\'intrant', required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    stock_disponible?: number;

    @ApiProperty({ description: 'Prix unitaire de l\'intrant', required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    prix_unitaire?: number;

    @ApiProperty({ description: 'Seuil d\'alerte pour le stock', required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    seuil_alerte?: number;
} 