import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { CategorieCout } from './categorie-cout.entity';

@Entity('couts')
export class Cout {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CategorieCout, { eager: true })
    categorie: CategorieCout;

    @Column('decimal', { precision: 10, scale: 2 })
    montant: number;

    @Column({ type: 'date' })
    date: Date;

    @Column('text')
    description: string;

    @Column({ length: 255, nullable: true })
    facture: string;

    @Column({ default: true })
    est_actif: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 