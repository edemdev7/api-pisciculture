import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { LivraisonIntrant } from '../../intrants/entities/livraison-intrant.entity';
import { Remboursement } from './remboursement.entity';

export enum AvanceStatut {
  EN_COURS = 'EN_COURS',
  REMBOURSEE = 'REMBOURSEE',
  PARTIELLE = 'PARTIELLE',
}

@Entity('avances_intrants')
export class AvanceIntrant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'pisciculteur_id' })
  pisciculteur: User;

  @Column()
  pisciculteur_id: number;

  @ManyToOne(() => LivraisonIntrant, { nullable: true })
  @JoinColumn({ name: 'livraison_id' })
  livraison: LivraisonIntrant;

  @Column({ nullable: true })
  livraison_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  montant: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({
    type: 'enum',
    enum: AvanceStatut,
    default: AvanceStatut.EN_COURS,
  })
  statut: AvanceStatut;

  @OneToMany(() => Remboursement, remboursement => remboursement.avance)
  remboursements: Remboursement[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 