import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Diagnostic } from './diagnostic.entity';
import { User } from '../../users/entities/user.entity';

export enum StatutTraitement {
    PLANIFIE = 'planifie',
    EN_COURS = 'en_cours',
    TERMINE = 'termine',
    ANNULE = 'annule'
}

@Entity('traitement')
export class Traitement {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Diagnostic, diagnostic => diagnostic.traitements)
    diagnostic: Diagnostic;

    @Column('text')
    description: string;

    @Column({ type: 'date' })
    date_debut: Date;

    @Column({ type: 'date', nullable: true })
    date_fin: Date;

    @Column({
        type: 'enum',
        enum: StatutTraitement,
        default: StatutTraitement.PLANIFIE
    })
    statut: StatutTraitement;

    @Column('text', { nullable: true })
    resultat: string;

    @Column('text', { nullable: true })
    commentaire: string;

    @ManyToOne(() => User)
    pisciculteur: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 