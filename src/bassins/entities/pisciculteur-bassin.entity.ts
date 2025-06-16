import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Bassin } from './bassin.entity';

export enum PisciculteurBassinStatus {
  ACTIF = 'ACTIF',
  TERMINE = 'TERMINE',
}

@Entity('pisciculteur_bassins')
export class PisciculteurBassin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'pisciculteur_id' })
  pisciculteur: User;

  @Column()
  pisciculteur_id: number;

  @ManyToOne(() => Bassin)
  @JoinColumn({ name: 'bassin_id' })
  bassin: Bassin;

  @Column()
  bassin_id: number;

  @Column()
  date_affectation: Date;

  @Column({ nullable: true })
  date_fin_affectation: Date;

  @Column({
    type: 'enum',
    enum: PisciculteurBassinStatus,
    default: PisciculteurBassinStatus.ACTIF,
  })
  statut: PisciculteurBassinStatus;

  @CreateDateColumn()
  created_at: Date;
} 