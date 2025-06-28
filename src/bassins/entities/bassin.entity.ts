import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { DistributionAliment } from '../../aliments/entities/distribution-aliment.entity';
import { Region } from '../../regions/region.entity';
import { PerformanceBassin } from './performance-bassin.entity';
import { PecheControle } from './peche-controle.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum BassinStatus {
  ACTIF = 'ACTIF',
  INACTIF = 'INACTIF',
  EN_MAINTENANCE = 'EN_MAINTENANCE',
}

@Entity('bassins')
export class Bassin {
  @ApiProperty({ description: 'Identifiant unique du bassin' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nom du bassin' })
  @Column({ length: 100 })
  nom: string;

  @ApiProperty({ description: 'Superficie du bassin en m²' })
  @Column('decimal', { precision: 10, scale: 2 })
  superficie: number;

  @ApiProperty({ description: 'Profondeur du bassin en m' })
  @Column('decimal', { precision: 10, scale: 2 })
  profondeur: number;

  @ApiProperty({ description: 'Type de bassin' })
  @Column({ length: 50 })
  type: string;

  @ApiProperty({ description: 'Description du bassin' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Indique si le bassin est actif' })
  @Column({ default: true })
  est_actif: boolean;

  @ApiProperty({ description: 'Statut du bassin' })
  @Column({
    type: 'enum',
    enum: BassinStatus,
    default: BassinStatus.ACTIF,
  })
  statut: BassinStatus;

  @ManyToOne(() => User, user => user.bassins)
  pisciculteur: User;

  @OneToMany(() => DistributionAliment, distribution => distribution.bassin)
  distributions: DistributionAliment[];

  @OneToMany(() => PerformanceBassin, performance => performance.bassin)
  performances: PerformanceBassin[];

  @OneToMany(() => PecheControle, peche => peche.bassin)
  peches_controle: PecheControle[];

  @ApiProperty({ description: 'Date de création du bassin' })
  @Column()
  date_creation: Date;

  @ApiProperty({ description: 'ID de l\'administrateur qui a créé le bassin' })
  @Column()
  admin_id: number;

  @ApiProperty({ description: 'Date de création' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Date de dernière mise à jour' })
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Region, region => region.bassins, { nullable: true, eager: true })
  region: Region;
} 