import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Notification } from './notification.entity';

export enum TypeAlerte {
    STOCK = 'STOCK',
    MALADIE = 'MALADIE',
    QUALITE_EAU = 'QUALITE_EAU'
}

export enum GraviteAlerte {
    FAIBLE = 'FAIBLE',
    MOYENNE = 'MOYENNE',
    ELEVEE = 'ELEVEE',
    CRITIQUE = 'CRITIQUE'
}

export enum StatutAlerte {
    ACTIVE = 'ACTIVE',
    RESOLUE = 'RESOLUE',
    ARCHIVEE = 'ARCHIVEE'
}

@Entity('alertes')
export class Alerte {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: TypeAlerte,
        default: TypeAlerte.STOCK
    })
    type: TypeAlerte;

    @Column({
        type: 'enum',
        enum: GraviteAlerte,
        default: GraviteAlerte.MOYENNE
    })
    gravite: GraviteAlerte;

    @Column('text')
    message: string;

    @Column({
        type: 'enum',
        enum: StatutAlerte,
        default: StatutAlerte.ACTIVE
    })
    statut: StatutAlerte;

    @ManyToOne(() => User, { eager: true })
    pisciculteur: User;

    @OneToMany(() => Notification, notification => notification.alerte)
    notifications: Notification[];

    @Column({ default: true })
    est_actif: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 