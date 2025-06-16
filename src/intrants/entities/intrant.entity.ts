import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { LivraisonIntrant } from './livraison-intrant.entity';
import { Stock } from '../../stocks/entities/stock.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum IntrantType {
  ALIMENT = 'aliment',
  MEDICAMENT = 'medicament',
  EQUIPEMENT = 'equipement',
  AUTRE = 'autre'
}

export enum IntrantStatus {
  DISPONIBLE = 'DISPONIBLE',
  RUPTURE = 'RUPTURE',
  DISCONTINUE = 'DISCONTINUE',
}

@Entity('intrant')
export class Intrant {
  @ApiProperty({ description: 'Identifiant unique de l\'intrant' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nom de l\'intrant' })
  @Column({ length: 100 })
  nom: string;

  @ApiProperty({ description: 'Description de l\'intrant' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Quantité disponible de l\'intrant' })
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  stock_disponible: number;

  @ApiProperty({ description: 'Unité de mesure de l\'intrant' })
  @Column({ length: 20 })
  unite_mesure: string;

  @ApiProperty({ description: 'Prix unitaire de l\'intrant' })
  @Column('decimal', { precision: 10, scale: 2 })
  prix_unitaire: number;

  @ApiProperty({ description: 'Date de création de l\'intrant' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Date de dernière mise à jour de l\'intrant' })
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => LivraisonIntrant, livraison => livraison.intrant)
  livraisons: LivraisonIntrant[];

  @OneToMany(() => Stock, stock => stock.intrant)
  stocks: Stock[];

  @Column({
    type: 'enum',
    enum: IntrantStatus,
    default: IntrantStatus.DISPONIBLE,
  })
  statut: IntrantStatus;

  @Column({
    type: 'enum',
    enum: IntrantType
  })
  type: IntrantType;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  seuil_alerte: number;
} 