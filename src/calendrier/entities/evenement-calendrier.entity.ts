import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum TypeEvenement {
  LIVRAISON = 'LIVRAISON',
  RECOLTE = 'RECOLTE',
  ACTIVITE = 'ACTIVITE',
}

@Entity('evenements_calendrier')
export class EvenementCalendrier {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  pisciculteur: User;

  @Column()
  pisciculteur_id: number;

  @Column({ type: 'enum', enum: TypeEvenement })
  type: TypeEvenement;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  date_debut: Date;

  @Column({ type: 'timestamp', nullable: true })
  date_fin: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 