import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Stock } from './stock.entity';
import { User } from '../../users/entities/user.entity';

export enum TypeMouvement {
  ENTREE = 'entree',
  SORTIE = 'sortie',
  AJUSTEMENT = 'ajustement'
}

@Entity('mouvement_stock')
export class MouvementStock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Stock, stock => stock.mouvements)
  stock: Stock;

  @Column({
    type: 'enum',
    enum: TypeMouvement
  })
  type: TypeMouvement;

  @Column('decimal', { precision: 10, scale: 2 })
  quantite: number;

  @Column('decimal', { precision: 10, scale: 2 })
  quantite_avant: number;

  @Column('decimal', { precision: 10, scale: 2 })
  quantite_apres: number;

  @Column({ type: 'text', nullable: true })
  commentaire: string;

  @ManyToOne(() => User)
  utilisateur: User;

  @CreateDateColumn()
  created_at: Date;
} 