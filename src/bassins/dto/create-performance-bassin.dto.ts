import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsDecimal, Min, Max } from 'class-validator';

export class CreatePerformanceBassinDto {
    @ApiProperty({ description: 'Nombre total de poissons' })
    @IsNumber()
    nombre_poissons: number;

    @ApiProperty({ description: 'Poids total en kg' })
    @IsNumber()
    @Min(0)
    poids_total: number;

    @ApiProperty({ description: 'Poids moyen par poisson en kg' })
    @IsNumber()
    @Min(0)
    poids_moyen: number;

    @ApiProperty({ description: 'Taux de mortalité en pourcentage' })
    @IsNumber()
    @Min(0)
    @Max(100)
    taux_mortalite: number;

    @ApiProperty({ description: 'Taux de croissance en pourcentage' })
    @IsNumber()
    @Min(0)
    @Max(100)
    taux_croissance: number;

    @ApiProperty({ description: 'Taux de conversion alimentaire', required: false })
    @IsNumber()
    @IsOptional()
    @Min(0)
    taux_conversion_alimentaire?: number;

    @ApiProperty({ description: 'Observations sur la performance', required: false })
    @IsString()
    @IsOptional()
    observations?: string;
} 