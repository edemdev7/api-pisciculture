import { IsOptional, IsString, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StatutTraitement } from '../entities/traitement.entity';

export class UpdateTraitementDto {
    @ApiProperty({
        description: 'Description du traitement',
        example: 'Traitement au sel à 3g/L pendant 7 jours',
        required: false
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'Date de début du traitement',
        example: '2024-03-15',
        required: false
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date_debut?: Date;

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
        example: StatutTraitement.EN_COURS,
        required: false
    })
    @IsOptional()
    @IsEnum(StatutTraitement)
    statut?: StatutTraitement;

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