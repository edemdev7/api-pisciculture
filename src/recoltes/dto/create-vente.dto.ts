import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDate, IsEnum, IsString, IsOptional } from 'class-validator';
import { StatutPaiement } from '../entities/vente.entity';

export class CreateVenteDto {
    @ApiProperty({ description: 'ID de la récolte' })
    @IsNotEmpty()
    @IsNumber()
    recolte_id: number;

    @ApiProperty({ description: 'Nom du client' })
    @IsNotEmpty()
    @IsString()
    client: string;

    @ApiProperty({ description: 'Date de la vente' })
    @IsNotEmpty()
    @IsDate()
    date_vente: Date;

    @ApiProperty({ description: 'Quantité vendue' })
    @IsNotEmpty()
    @IsNumber()
    quantite: number;

    @ApiProperty({ description: 'Prix total' })
    @IsNotEmpty()
    @IsNumber()
    prix_total: number;

    @ApiProperty({ description: 'Statut du paiement', enum: StatutPaiement })
    @IsNotEmpty()
    @IsEnum(StatutPaiement)
    statut_paiement: StatutPaiement;

    @ApiProperty({ description: 'ID du pisciculteur' })
    @IsNotEmpty()
    @IsNumber()
    pisciculteur_id: number;

    @ApiProperty({ description: 'Commentaire', required: false })
    @IsOptional()
    @IsString()
    commentaire?: string;
} 