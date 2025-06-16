import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Bassin } from '../../bassins/entities/bassin.entity';
import { User } from '../../users/entities/user.entity';
import { Vente } from './vente.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum QualiteRecolte {
    EXCELLENTE = 'excellente',
    BONNE = 'bonne',
    MOYENNE = 'moyenne',
    MEDIOCRE = 'mediocre'
}

@Entity('recolte')
export class Recolte {
    @ApiProperty({ description: 'Identifiant unique de la récolte' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Bassin associé à la récolte' })
    @ManyToOne(() => Bassin)
    bassin: Bassin;

    @Column()
    bassin_id: number;

    @ApiProperty({ description: 'Date de la récolte' })
    @Column({ type: 'date' })
    date_recolte: Date;

    @ApiProperty({ description: 'Quantité récoltée' })
    @Column('decimal', { precision: 10, scale: 2 })
    quantite: number;

    @ApiProperty({ description: 'Qualité de la récolte' })
    @Column({
        type: 'enum',
        enum: QualiteRecolte,
        default: QualiteRecolte.BONNE
    })
    qualite: QualiteRecolte;

    @ApiProperty({ description: 'Prix unitaire de la récolte' })
    @Column('decimal', { precision: 10, scale: 2 })
    prix_unitaire: number;

    @ApiProperty({ description: 'Commentaire sur la récolte' })
    @Column('text', { nullable: true })
    commentaire: string;

    @ApiProperty({ description: 'Pisciculteur responsable de la récolte' })
    @ManyToOne(() => User)
    pisciculteur: User;

    @Column()
    pisciculteur_id: number;

    @OneToMany(() => Vente, vente => vente.recolte)
    ventes: Vente[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 