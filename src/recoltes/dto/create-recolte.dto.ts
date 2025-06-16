import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDate, IsEnum, IsString, IsOptional } from 'class-validator';
import { QualiteRecolte } from '../entities/recolte.entity';

export class CreateRecolteDto {
    @ApiProperty({ description: 'ID du bassin' })
    @IsNotEmpty()
    @IsNumber()
    bassin_id: number;

    @ApiProperty({ description: 'Date de la récolte' })
    @IsNotEmpty()
    @IsDate()
    date_recolte: Date;

    @ApiProperty({ description: 'Quantité récoltée' })
    @IsNotEmpty()
    @IsNumber()
    quantite: number;

    @ApiProperty({ description: 'Qualité de la récolte', enum: QualiteRecolte })
    @IsNotEmpty()
    @IsEnum(QualiteRecolte)
    qualite: QualiteRecolte;

    @ApiProperty({ description: 'Prix unitaire' })
    @IsNotEmpty()
    @IsNumber()
    prix_unitaire: number;

    @ApiProperty({ description: 'Commentaire', required: false })
    @IsOptional()
    @IsString()
    commentaire?: string;

    @ApiProperty({ description: 'ID du pisciculteur' })
    @IsNotEmpty()
    @IsNumber()
    pisciculteur_id: number;
} 