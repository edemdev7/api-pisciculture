import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsDate, IsEnum, IsString } from 'class-validator';
import { QualiteRecolte } from '../entities/recolte.entity';

export class UpdateRecolteDto {
    @ApiProperty({ description: 'ID du bassin', required: false })
    @IsOptional()
    @IsNumber()
    bassin_id?: number;

    @ApiProperty({ description: 'Date de la récolte', required: false })
    @IsOptional()
    @IsDate()
    date_recolte?: Date;

    @ApiProperty({ description: 'Quantité récoltée', required: false })
    @IsOptional()
    @IsNumber()
    quantite?: number;

    @ApiProperty({ description: 'Qualité de la récolte', enum: QualiteRecolte, required: false })
    @IsOptional()
    @IsEnum(QualiteRecolte)
    qualite?: QualiteRecolte;

    @ApiProperty({ description: 'Prix unitaire', required: false })
    @IsOptional()
    @IsNumber()
    prix_unitaire?: number;

    @ApiProperty({ description: 'Commentaire', required: false })
    @IsOptional()
    @IsString()
    commentaire?: string;

    @ApiProperty({ description: 'ID du pisciculteur', required: false })
    @IsOptional()
    @IsNumber()
    pisciculteur_id?: number;
} 