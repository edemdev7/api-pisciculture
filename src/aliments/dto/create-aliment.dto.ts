import { IsNotEmpty, IsString, IsNumber, IsEnum, Min, IsOptional } from 'class-validator';
import { TypeAliment } from '../entities/aliment.entity';

export class CreateAlimentDto {
    @IsNotEmpty()
    @IsString()
    nom: string;

    @IsNotEmpty()
    @IsEnum(TypeAliment)
    type: TypeAliment;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    taux_proteine: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    taux_lipide: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    taux_energie: number;

    @IsNotEmpty()
    @IsString()
    unite_mesure: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    seuil_alerte: number;
} 