import { IsNotEmpty, IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GraviteMaladie } from '../entities/maladie.entity';

export class CreateMaladieDto {
    @ApiProperty({
        description: 'Nom de la maladie',
        example: 'Ichthyophthirius multifiliis'
    })
    @IsNotEmpty()
    @IsString()
    nom: string;

    @ApiProperty({
        description: 'Description détaillée de la maladie',
        example: 'Maladie parasitaire causée par un protozoaire'
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Symptômes observés',
        example: 'Points blancs sur la peau, comportement anormal'
    })
    @IsNotEmpty()
    @IsString()
    symptomes: string;

    @ApiProperty({
        description: 'Traitements recommandés',
        example: 'Augmentation de la température, traitement au sel'
    })
    @IsNotEmpty()
    @IsString()
    traitements_recommandes: string;

    @ApiProperty({
        description: 'Niveau de gravité de la maladie',
        enum: GraviteMaladie,
        example: GraviteMaladie.MODEREE
    })
    @IsNotEmpty()
    @IsEnum(GraviteMaladie)
    gravite: GraviteMaladie;

    @ApiProperty({
        description: 'Indique si la maladie est active',
        default: true,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    est_actif?: boolean;
} 