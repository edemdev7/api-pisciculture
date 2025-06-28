import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Bassin } from './bassin.entity';
import { User } from '../../users/entities/user.entity';

@Entity('peches_controle')
export class PecheControle {
    @ApiProperty({ description: 'Identifiant unique de la pêche de contrôle' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Date de la pêche de contrôle' })
    @CreateDateColumn()
    date_peche: Date;

    @ApiProperty({ description: 'Nombre de poissons pêchés pour le contrôle' })
    @Column({ type: 'int' })
    nombre_poissons_peches: number;

    @ApiProperty({ description: 'Poids total des poissons pêchés en kg' })
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    poids_total_peche: number;

    @ApiProperty({ description: 'Poids moyen par poisson en kg' })
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    poids_moyen_poisson: number;

    @ApiProperty({ description: 'Taille moyenne des poissons en cm' })
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    taille_moyenne: number;

    @ApiProperty({ description: 'État de santé des poissons' })
    @Column({ length: 50, nullable: true })
    etat_sante: string;

    @ApiProperty({ description: 'Observations sur la pêche de contrôle' })
    @Column({ type: 'text', nullable: true })
    observations: string;

    @ApiProperty({ description: 'Méthode de pêche utilisée' })
    @Column({ length: 100, nullable: true })
    methode_peche: string;

    @ManyToOne(() => Bassin, bassin => bassin.peches_controle)
    @JoinColumn({ name: 'bassin_id' })
    bassin: Bassin;

    @Column({ name: 'bassin_id' })
    bassinId: number;

    @ManyToOne(() => User, user => user.peches_controle)
    @JoinColumn({ name: 'pisciculteur_id' })
    pisciculteur: User;

    @Column({ name: 'pisciculteur_id' })
    pisciculteurId: number;
} 