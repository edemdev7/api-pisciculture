import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Bassin } from '../../bassins/entities/bassin.entity';
import { ParametreEau } from './parametre-eau.entity';

@Entity('mesures_eau')
export class MesureEau {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Bassin, { eager: true })
    bassin: Bassin;

    @ManyToOne(() => ParametreEau, { eager: true })
    parametre: ParametreEau;

    @Column('decimal', { precision: 10, scale: 2 })
    valeur: number;

    @Column({ type: 'timestamp' })
    date_mesure: Date;

    @Column('text', { nullable: true })
    commentaire: string;

    @Column({ default: true })
    est_actif: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 