import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsDate, IsEnum, IsString } from 'class-validator';
import { StatutPaiement } from '../entities/vente.entity';

export class UpdateVenteDto {
    @ApiProperty({ description: 'ID de la récolte', required: false })
    @IsOptional()
    @IsNumber()
    recolte_id?: number;

    @ApiProperty({ description: 'Nom du client', required: false })
    @IsOptional()
    @IsString()
    client?: string;

    @ApiProperty({ description: 'Date de la vente', required: false })
    @IsOptional()
    @IsDate()
    date_vente?: Date;

    @ApiProperty({ description: 'Quantité vendue', required: false })
    @IsOptional()
    @IsNumber()
    quantite?: number;

    @ApiProperty({ description: 'Prix total', required: false })
    @IsOptional()
    @IsNumber()
    prix_total?: number;

    @ApiProperty({ description: 'Statut du paiement', enum: StatutPaiement, required: false })
    @IsOptional()
    @IsEnum(StatutPaiement)
    statut_paiement?: StatutPaiement;

    @ApiProperty({ description: 'ID du pisciculteur', required: false })
    @IsOptional()
    @IsNumber()
    pisciculteur_id?: number;

    @ApiProperty({ description: 'Commentaire', required: false })
    @IsOptional()
    @IsString()
    commentaire?: string;
} 