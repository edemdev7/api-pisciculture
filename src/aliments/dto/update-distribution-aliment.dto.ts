import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsDate, IsEnum, IsString } from 'class-validator';
import { StatutDistribution } from '../entities/distribution-aliment.entity';

export class UpdateDistributionAlimentDto {
    @ApiProperty({ description: 'ID de l\'aliment', example: 1, required: false })
    @IsOptional()
    @IsNumber()
    aliment_id?: number;

    @ApiProperty({ description: 'ID du bassin', example: 1, required: false })
    @IsOptional()
    @IsNumber()
    bassin_id?: number;

    @ApiProperty({ description: 'Quantité d\'aliment à distribuer', example: 5.5, required: false })
    @IsOptional()
    @IsNumber()
    quantite?: number;

    @ApiProperty({ description: 'Date prévue de distribution', example: '2024-03-20T10:00:00Z', required: false })
    @IsOptional()
    @IsDate()
    date_prevue?: Date;

    @ApiProperty({ description: 'Date effective de distribution', example: '2024-03-20T10:30:00Z', required: false })
    @IsOptional()
    @IsDate()
    date_distribution?: Date;

    @ApiProperty({ 
        description: 'Statut de la distribution',
        enum: StatutDistribution,
        example: StatutDistribution.TERMINEE,
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