import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';

export class CreatePecheControleDto {
    @ApiProperty({ description: 'Nombre de poissons pêchés pour le contrôle' })
    @IsNumber()
    @Min(1)
    nombre_poissons_peches: number;

    @ApiProperty({ description: 'Poids total des poissons pêchés en kg' })
    @IsNumber()
    @Min(0)
    poids_total_peche: number;

    @ApiProperty({ description: 'Poids moyen par poisson en kg' })
    @IsNumber()
    @Min(0)
    poids_moyen_poisson: number;

    @ApiProperty({ description: 'Taille moyenne des poissons en cm', required: false })
    @IsNumber()
    @IsOptional()
    @Min(0)
    taille_moyenne?: number;

    @ApiProperty({ description: 'État de santé des poissons', required: false })
    @IsString()
    @IsOptional()
    etat_sante?: string;

    @ApiProperty({ description: 'Observations sur la pêche de contrôle', required: false })
    @IsString()
    @IsOptional()
    observations?: string;

    @ApiProperty({ description: 'Méthode de pêche utilisée', required: false })
    @IsString()
    @IsOptional()
    methode_peche?: string;
} 