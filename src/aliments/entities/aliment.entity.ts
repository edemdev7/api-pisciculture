import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { StockAliment } from './stock-aliment.entity';
import { DistributionAliment } from './distribution-aliment.entity';

export enum TypeAliment {
    GRANULE = 'granule',
    FARINE = 'farine',
    COMPOSE = 'compose',
    NATUREL = 'naturel'
}

@Entity('aliment')
export class Aliment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nom: string;

    @Column({
        type: 'enum',
        enum: TypeAliment,
        default: TypeAliment.GRANULE
    })
    type: TypeAliment;

    @Column('text', { nullable: true })
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    taux_proteine: number;

    @Column('decimal', { precision: 10, scale: 2 })
    taux_lipide: number;

    @Column('decimal', { precision: 10, scale: 2 })
    taux_energie: number;

    @Column({ length: 20 })
    unite_mesure: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    stock_disponible: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    seuil_alerte: number;

    @Column({ default: true })
    est_actif: boolean;

    @OneToMany(() => StockAliment, stockAliment => stockAliment.aliment)
    stocks: StockAliment[];

    @OneToMany(() => DistributionAliment, distributionAliment => distributionAliment.aliment)
    distributions: DistributionAliment[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 