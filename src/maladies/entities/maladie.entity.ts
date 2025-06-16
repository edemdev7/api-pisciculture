import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Diagnostic } from './diagnostic.entity';

export enum GraviteMaladie {
    LEGERE = 'legere',
    MODEREE = 'moderee',
    GRAVE = 'grave',
    CRITIQUE = 'critique'
}

@Entity('maladie')
export class Maladie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nom: string;

    @Column('text')
    description: string;

    @Column('text')
    symptomes: string;

    @Column('text')
    traitements_recommandes: string;

    @Column({
        type: 'enum',
        enum: GraviteMaladie,
        default: GraviteMaladie.MODEREE
    })
    gravite: GraviteMaladie;

    @Column({ default: true })
    est_actif: boolean;

    @OneToMany(() => Diagnostic, diagnostic => diagnostic.maladie)
    diagnostics: Diagnostic[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 