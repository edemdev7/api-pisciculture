import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Maladie } from './maladie.entity';
import { Bassin } from '../../bassins/entities/bassin.entity';
import { User } from '../../users/entities/user.entity';
import { Traitement } from './traitement.entity';

export enum StatutDiagnostic {
    EN_COURS = 'en_cours',
    RESOLU = 'resolu',
    NON_RESOLU = 'non_resolu',
    EN_SURVEILLANCE = 'en_surveillance'
}

@Entity('diagnostic')
export class Diagnostic {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Maladie, maladie => maladie.diagnostics)
    maladie: Maladie;

    @ManyToOne(() => Bassin)
    bassin: Bassin;

    @Column({ type: 'date' })
    date_diagnostic: Date;

    @Column({
        type: 'enum',
        enum: StatutDiagnostic,
        default: StatutDiagnostic.EN_COURS
    })
    statut: StatutDiagnostic;

    @Column('text', { nullable: true })
    commentaire: string;

    @ManyToOne(() => User)
    pisciculteur: User;

    @OneToMany(() => Traitement, traitement => traitement.diagnostic)
    traitements: Traitement[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 