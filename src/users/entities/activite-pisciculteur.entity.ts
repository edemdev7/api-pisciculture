import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export enum TypeActivite {
    CONNEXION = 'connexion',
    CREATION_BASSIN = 'creation_bassin',
    AJOUT_POISSON = 'ajout_poisson',
    DISTRIBUTION_ALIMENT = 'distribution_aliment',
    DIAGNOSTIC_MALADIE = 'diagnostic_maladie',
    TRAITEMENT = 'traitement',
    RECOLTE = 'recolte',
    VENTE = 'vente',
    MESURE_EAU = 'mesure_eau',
    MAINTENANCE_EQUIPEMENT = 'maintenance_equipement',
    AUTRE = 'autre'
}

@Entity('activites_pisciculteur')
export class ActivitePisciculteur {
    @ApiProperty({ description: 'Identifiant unique de l\'activité' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Type d\'activité effectuée' })
    @Column({
        type: 'enum',
        enum: TypeActivite
    })
    type: TypeActivite;

    @ApiProperty({ description: 'Description détaillée de l\'activité' })
    @Column({ type: 'text' })
    description: string;

    @ApiProperty({ description: 'Données supplémentaires de l\'activité (JSON)' })
    @Column({ type: 'json', nullable: true })
    donnees: any;

    @ApiProperty({ description: 'Adresse IP de l\'utilisateur' })
    @Column({ nullable: true })
    ip_address: string;

    @ApiProperty({ description: 'User agent du navigateur' })
    @Column({ nullable: true })
    user_agent: string;

    @ApiProperty({ description: 'Date et heure de l\'activité' })
    @CreateDateColumn()
    date_activite: Date;

    @ManyToOne(() => User, user => user.activites)
    @JoinColumn({ name: 'pisciculteur_id' })
    pisciculteur: User;

    @Column({ name: 'pisciculteur_id' })
    pisciculteurId: number;
} 