import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Aliment } from './aliment.entity';
import { Bassin } from '../../bassins/entities/bassin.entity';
import { User } from '../../users/entities/user.entity';

export enum StatutDistribution {
    PLANIFIEE = 'planifiee',
    EN_COURS = 'en_cours',
    TERMINEE = 'terminee',
    ANNULEE = 'annulee'
}

@Entity('distribution_aliment')
export class DistributionAliment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Aliment, aliment => aliment.distributions)
    aliment: Aliment;

    @ManyToOne(() => Bassin)
    bassin: Bassin;

    @Column('decimal', { precision: 10, scale: 2 })
    quantite: number;

    @Column({ type: 'timestamp' })
    date_prevue: Date;

    @Column({ type: 'timestamp', nullable: true })
    date_distribution: Date;

    @Column({
        type: 'enum',
        enum: StatutDistribution,
        default: StatutDistribution.PLANIFIEE
    })
    statut: StatutDistribution;

    @Column('text', { nullable: true })
    commentaire: string;

    @ManyToOne(() => User)
    pisciculteur: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 