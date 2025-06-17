import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Maintenance } from './maintenance.entity';

export enum TypeEquipement {
    POMPE = 'pompe',
    FILTRE = 'filtre',
    AERATEUR = 'aérateur',
    CAPTEUR = 'capteur',
    AUTRE = 'autre'
}

export enum StatutEquipement {
    ACTIF = 'actif',
    EN_MAINTENANCE = 'en_maintenance',
    HORS_SERVICE = 'hors_service'
}

@Entity('equipements')
export class Equipement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nom: string;

    @Column({
        type: 'enum',
        enum: TypeEquipement,
        default: TypeEquipement.AUTRE
    })
    type: TypeEquipement;

    @Column('text')
    description: string;

    @Column({
        type: 'enum',
        enum: StatutEquipement,
        default: StatutEquipement.ACTIF
    })
    statut: StatutEquipement;

    @Column({ type: 'date' })
    date_acquisition: Date;

    @Column({ type: 'date', nullable: true })
    date_maintenance: Date;

    @OneToMany(() => Maintenance, maintenance => maintenance.equipement)
    maintenances: Maintenance[];

    @Column({ default: true })
    est_actif: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 