import { IsEnum, IsDate, IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeStatistique } from '../entities/statistique.entity';

export class CreateStatistiqueDto {
    @ApiProperty({ enum: TypeStatistique, description: 'Type de statistique' })
    @IsEnum(TypeStatistique)
    @IsNotEmpty()
    type: TypeStatistique;

    @ApiProperty({ description: 'Date de début de la période' })
    @IsDate()
    @IsNotEmpty()
    periode_debut: Date;

    @ApiProperty({ description: 'Date de fin de la période' })
    @IsDate()
    @IsNotEmpty()
    periode_fin: Date;

    @ApiProperty({ description: 'Valeur de la statistique' })
    @IsNumber()
    @IsNotEmpty()
    valeur: number;

    @ApiProperty({ description: 'Commentaire optionnel', required: false })
    @IsString()
    @IsOptional()
    commentaire?: string;
} 