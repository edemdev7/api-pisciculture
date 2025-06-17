import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum TypeStatistique {
    PRODUCTION = 'PRODUCTION',
    MORTALITE = 'MORTALITE',
    ALIMENTATION = 'ALIMENTATION'
}

@Entity('statistiques')
export class Statistique {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: TypeStatistique,
        default: TypeStatistique.PRODUCTION
    })
    type: TypeStatistique;

    @Column({ type: 'date' })
    periode_debut: Date;

    @Column({ type: 'date' })
    periode_fin: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    valeur: number;

    @Column('text', { nullable: true })
    commentaire: string;

    @ManyToOne(() => User, { eager: true })
    created_by: User;

    @Column({ default: true })
    est_actif: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 