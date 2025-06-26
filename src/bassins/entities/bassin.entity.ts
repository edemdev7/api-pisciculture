import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { DistributionAliment } from '../../aliments/entities/distribution-aliment.entity';
import { Region } from '../../regions/region.entity';

export enum BassinStatus {
  ACTIF = 'ACTIF',
  INACTIF = 'INACTIF',
  EN_MAINTENANCE = 'EN_MAINTENANCE',
}

@Entity('bassins')
export class Bassin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nom: string;

  @Column('decimal', { precision: 10, scale: 2 })
  superficie: number;

  @Column('decimal', { precision: 10, scale: 2 })
  profondeur: number;

  @Column({ length: 50 })
  type: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: true })
  est_actif: boolean;

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

  @Column()
  date_creation: Date;

  @Column()
  admin_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Region, region => region.bassins, { nullable: true, eager: true })
  region: Region;
} 