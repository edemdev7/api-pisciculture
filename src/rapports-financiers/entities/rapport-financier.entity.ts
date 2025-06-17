import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum TypeRapportFinancier {
    JOURNALIER = 'journalier',
    MENSUEL = 'mensuel',
    ANNUEL = 'annuel',
}

@Entity('rapports_financiers')
export class RapportFinancier {
    @ApiProperty({ description: 'Identifiant unique du rapport' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ 
        description: 'Type du rapport',
        enum: TypeRapportFinancier,
        example: TypeRapportFinancier.MENSUEL
    })
    @Column({
        type: 'enum',
        enum: TypeRapportFinancier,
        default: TypeRapportFinancier.MENSUEL
    })
    type: TypeRapportFinancier;

    @ApiProperty({ description: 'Date de début de la période' })
    @Column({ type: 'date' })
    dateDebut: Date;

    @ApiProperty({ description: 'Date de fin de la période' })
    @Column({ type: 'date' })
    dateFin: Date;

    @ApiProperty({ description: 'Total des revenus sur la période' })
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    revenus: number;

    @ApiProperty({ description: 'Total des dépenses sur la période' })
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    depenses: number;

    @ApiProperty({ description: 'Bénéfice net sur la période' })
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    benefice: number;

    @ApiProperty({ description: 'Commentaires sur le rapport' })
    @Column({ type: 'text', nullable: true })
    commentaire: string;

    @ApiProperty({ description: 'Date de création du rapport' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Date de dernière mise à jour du rapport' })
    @UpdateDateColumn()
    updatedAt: Date;
} 