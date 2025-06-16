import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Intrant } from './intrant.entity';
import { User } from '../../users/entities/user.entity';
import { Bassin } from '../../bassins/entities/bassin.entity';

export enum LivraisonStatus {
  PLANIFIEE = 'PLANIFIEE',
  EN_COURS = 'EN_COURS',
  LIVREE = 'LIVREE',
  ANNULEE = 'ANNULEE',
}

@Entity('livraisons_intrants')
export class LivraisonIntrant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bassin)
  @JoinColumn({ name: 'bassin_id' })
  bassin: Bassin;

  @Column()
  bassin_id: number;

  @ManyToOne(() => Intrant)
  @JoinColumn({ name: 'intrant_id' })
  intrant: Intrant;

  @Column()
  intrant_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  quantite: number;

  @Column()
  date_prevue: Date;

  @Column({ nullable: true })
  date_livree: Date;

  @Column({
    type: 'enum',
    enum: LivraisonStatus,
    default: LivraisonStatus.PLANIFIEE,
  })
  statut: LivraisonStatus;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'admin_id' })
  admin: User;

  @Column()
  admin_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'pisciculteur_id' })
  pisciculteur: User;

  @Column()
  pisciculteur_id: number;

  @Column({ type: 'text', nullable: true })
  commentaire: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 