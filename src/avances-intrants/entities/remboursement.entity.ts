import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { AvanceIntrant } from './avance-intrant.entity';
import { User } from '../../users/entities/user.entity';

export enum RemboursementType {
  MANUEL = 'MANUEL',
  AUTOMATIQUE = 'AUTOMATIQUE',
}

@Entity('remboursements')
export class Remboursement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AvanceIntrant, avance => avance.remboursements)
  @JoinColumn({ name: 'avance_id' })
  avance: AvanceIntrant;

  @Column()
  avance_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'pisciculteur_id' })
  pisciculteur: User;

  @Column()
  pisciculteur_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  montant: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({
    type: 'enum',
    enum: RemboursementType,
    default: RemboursementType.AUTOMATIQUE,
  })
  type: RemboursementType;

  @CreateDateColumn()
  created_at: Date;
} 