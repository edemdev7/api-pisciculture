import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Equipement } from './equipement.entity';

export enum TypeMaintenance {
    PREVENTIVE = 'preventive',
    CORRECTIVE = 'corrective',
    ROUTINE = 'routine'
}

@Entity('maintenances')
export class Maintenance {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Equipement, { eager: true })
    equipement: Equipement;

    @Column({
        type: 'enum',
        enum: TypeMaintenance,
        default: TypeMaintenance.ROUTINE
    })
    type: TypeMaintenance;

    @Column({ type: 'date' })
    date: Date;

    @Column('text')
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    cout: number;

    @Column({ length: 100 })
    technicien: string;

    @Column({ default: true })
    est_actif: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 