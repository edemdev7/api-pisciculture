import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { MesureEau } from './mesure-eau.entity';

@Entity('parametres_eau')
export class ParametreEau {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nom: string;

    @Column({ length: 50 })
    unite: string;

    @Column('decimal', { precision: 10, scale: 2 })
    valeur_minimale: number;

    @Column('decimal', { precision: 10, scale: 2 })
    valeur_maximale: number;

    @Column('text')
    description: string;

    @OneToMany(() => MesureEau, mesure => mesure.parametre)
    mesures: MesureEau[];

    @Column({ default: true })
    est_actif: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 