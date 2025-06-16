import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsEnum, IsString, IsOptional } from 'class-validator';
import { StatutDistribution } from '../entities/distribution-aliment.entity';

export class CreateDistributionAlimentDto {
    @ApiProperty({ description: 'ID de l\'aliment', example: 1 })
    @IsNumber()
    aliment_id: number;

    @ApiProperty({ description: 'ID du bassin', example: 1 })
    @IsNumber()
    bassin_id: number;

    @ApiProperty({ description: 'Quantité d\'aliment à distribuer', example: 5.5 })
    @IsNumber()
    quantite: number;

    @ApiProperty({ description: 'Date prévue de distribution', example: '2024-03-20T10:00:00Z' })
    @IsDate()
    date_prevue: Date;

    @ApiProperty({ description: 'Date effective de distribution', example: '2024-03-20T10:30:00Z', required: false })
    @IsOptional()
    @IsDate()
    date_distribution?: Date;

    @ApiProperty({ 
        description: 'Statut de la distribution',
        enum: StatutDistribution,
        example: StatutDistribution.PLANIFIEE,
        required: false 
    })
    @IsOptional()
    @IsEnum(StatutDistribution)
    statut?: StatutDistribution;

    @ApiProperty({ description: 'Commentaire sur la distribution', example: 'Distribution effectuée avec succès', required: false })
    @IsOptional()
    @IsString()
    commentaire?: string;
} 