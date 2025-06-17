import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Alerte } from './alerte.entity';

export enum StatutLecture {
    NON_LU = 'NON_LU',
    LU = 'LU'
}

@Entity('notifications')
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Alerte, { eager: true })
    alerte: Alerte;

    @ManyToOne(() => User, { eager: true })
    utilisateur: User;

    @Column({
        type: 'enum',
        enum: StatutLecture,
        default: StatutLecture.NON_LU
    })
    statut_lecture: StatutLecture;

    @Column({ default: true })
    est_actif: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 