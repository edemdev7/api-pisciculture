import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum TypeRapport {
    QUOTIDIEN = 'QUOTIDIEN',
    HEBDOMADAIRE = 'HEBDOMADAIRE',
    MENSUEL = 'MENSUEL'
}

@Entity('rapports')
export class Rapport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: TypeRapport,
        default: TypeRapport.QUOTIDIEN
    })
    type: TypeRapport;

    @Column({ type: 'date' })
    date: Date;

    @Column('text')
    contenu: string;

    @ManyToOne(() => User, { eager: true })
    pisciculteur: User;

    @Column({ default: true })
    est_actif: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 