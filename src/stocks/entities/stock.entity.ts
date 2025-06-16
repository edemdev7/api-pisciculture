import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Intrant } from '../../intrants/entities/intrant.entity';
import { MouvementStock } from './mouvement-stock.entity';

export enum StockStatut {
  EN_STOCK = 'en_stock',
  EPUISE = 'epuise',
  PERIME = 'perime'
}

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Intrant, intrant => intrant.stocks)
  intrant: Intrant;

  @Column('decimal', { precision: 10, scale: 2 })
  quantite: number;

  @Column({ type: 'date', nullable: true })
  date_expiration: Date;

  @Column({
    type: 'enum',
    enum: StockStatut,
    default: StockStatut.EN_STOCK
  })
  statut: StockStatut;

  @Column('decimal', { precision: 10, scale: 2 })
  seuil_alerte: number;

  @OneToMany(() => MouvementStock, mouvement => mouvement.stock)
  mouvements: MouvementStock[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 