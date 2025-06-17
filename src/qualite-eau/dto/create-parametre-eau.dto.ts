import { IsString, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParametreEauDto {
    @ApiProperty({ description: 'Nom du paramètre' })
    @IsString()
    @IsNotEmpty()
    nom: string;

    @ApiProperty({ description: 'Unité de mesure' })
    @IsString()
    @IsNotEmpty()
    unite: string;

    @ApiProperty({ description: 'Valeur minimale acceptable' })
    @IsNumber()
    @IsNotEmpty()
    valeur_minimale: number;

    @ApiProperty({ description: 'Valeur maximale acceptable' })
    @IsNumber()
    @IsNotEmpty()
    valeur_maximale: number;

    @ApiProperty({ description: 'Description du paramètre' })
    @IsString()
    @IsNotEmpty()
    description: string;
} 