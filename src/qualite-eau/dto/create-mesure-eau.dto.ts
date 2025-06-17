import { IsNumber, IsDate, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMesureEauDto {
    @ApiProperty({ description: 'ID du bassin' })
    @IsNumber()
    @IsNotEmpty()
    bassin_id: number;

    @ApiProperty({ description: 'ID du paramètre' })
    @IsNumber()
    @IsNotEmpty()
    parametre_id: number;

    @ApiProperty({ description: 'Valeur mesurée' })
    @IsNumber()
    @IsNotEmpty()
    valeur: number;

    @ApiProperty({ description: 'Date de la mesure' })
    @IsDate()
    @IsNotEmpty()
    date_mesure: Date;

    @ApiProperty({ description: 'Commentaire optionnel', required: false })
    @IsString()
    @IsOptional()
    commentaire?: string;
} 