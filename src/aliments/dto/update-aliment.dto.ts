import { IsOptional, IsString, IsNumber, IsEnum, Min, IsBoolean } from 'class-validator';
import { TypeAliment } from '../entities/aliment.entity';

export class UpdateAlimentDto {
    @IsOptional()
    @IsString()
    nom?: string;

    @IsOptional()
    @IsEnum(TypeAliment)
    type?: TypeAliment;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    taux_proteine?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    taux_lipide?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    taux_energie?: number;

    @IsOptional()
    @IsString()
    unite_mesure?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    seuil_alerte?: number;

    @IsOptional()
    @IsBoolean()
    est_actif?: boolean;
} 