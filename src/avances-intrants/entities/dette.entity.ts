import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum DetteStatut {
  EN_COURS = 'EN_COURS',
  REGLEE = 'REGLEE',
  PARTIELLE = 'PARTIELLE',
}

@Entity('dettes')
export class Dette {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'pisciculteur_id' })
  pisciculteur: User;

  @Column()
  pisciculteur_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  montant_initial: number;

  @Column('decimal', { precision: 10, scale: 2 })
  solde: number;

  @Column({
    type: 'enum',
    enum: DetteStatut,
    default: DetteStatut.EN_COURS,
  })
  statut: DetteStatut;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 