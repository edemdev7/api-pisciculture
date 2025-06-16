import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Recolte } from './recolte.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum StatutPaiement {
    EN_ATTENTE = 'en_attente',
    PAYE = 'paye',
    ANNULE = 'annule'
}

@Entity('vente')
export class Vente {
    @ApiProperty({ description: 'Identifiant unique de la vente' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Récolte associée à la vente' })
    @ManyToOne(() => Recolte, recolte => recolte.ventes)
    recolte: Recolte;

    @Column()
    recolte_id: number;

    @ApiProperty({ description: 'Client de la vente' })
    @Column({ length: 100 })
    client: string;

    @ApiProperty({ description: 'Date de la vente' })
    @Column({ type: 'date' })
    date_vente: Date;

    @ApiProperty({ description: 'Quantité vendue' })
    @Column('decimal', { precision: 10, scale: 2 })
    quantite: number;

    @ApiProperty({ description: 'Prix total de la vente' })
    @Column('decimal', { precision: 10, scale: 2 })
    prix_total: number;

    @ApiProperty({ description: 'Statut du paiement' })
    @Column({
        type: 'enum',
        enum: StatutPaiement,
        default: StatutPaiement.EN_ATTENTE
    })
    statut_paiement: StatutPaiement;

    @ApiProperty({ description: 'Pisciculteur responsable de la vente' })
    @ManyToOne(() => User)
    pisciculteur: User;

    @Column()
    pisciculteur_id: number;

    @ApiProperty({ description: 'Commentaire sur la vente' })
    @Column('text', { nullable: true })
    commentaire: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 