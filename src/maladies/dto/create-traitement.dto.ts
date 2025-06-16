import { IsNotEmpty, IsNumber, IsString, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StatutTraitement } from '../entities/traitement.entity';

export class CreateTraitementDto {
    @ApiProperty({
        description: 'ID du diagnostic associé',
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    diagnostic_id: number;

    @ApiProperty({
        description: 'Description du traitement',
        example: 'Traitement au sel à 3g/L pendant 7 jours'
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Date de début du traitement',
        example: '2024-03-15'
    })
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date_debut: Date;

    @ApiProperty({
        description: 'Date de fin du traitement',
        example: '2024-03-22',
        required: false
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date_fin?: Date;

    @ApiProperty({
        description: 'Statut du traitement',
        enum: StatutTraitement,
        example: StatutTraitement.PLANIFIE
    })
    @IsNotEmpty()
    @IsEnum(StatutTraitement)
    statut: StatutTraitement;

    @ApiProperty({
        description: 'Résultat du traitement',
        example: 'Amélioration significative des symptômes',
        required: false
    })
    @IsOptional()
    @IsString()
    resultat?: string;

    @ApiProperty({
        description: 'Commentaires sur le traitement',
        example: 'Suivi quotidien nécessaire',
        required: false
    })
    @IsOptional()
    @IsString()
    commentaire?: string;
} 