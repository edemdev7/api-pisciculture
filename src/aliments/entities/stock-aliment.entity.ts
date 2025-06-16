import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Aliment } from './aliment.entity';
import { MouvementStockAliment } from './mouvement-stock-aliment.entity';
import { User } from '../../users/entities/user.entity';

export enum StatutStock {
    EN_STOCK = 'en_stock',
    EPUISE = 'epuise',
    PERIME = 'perime'
}

@Entity('stock_aliment')
export class StockAliment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Aliment, aliment => aliment.stocks)
    aliment: Aliment;

    @Column('decimal', { precision: 10, scale: 2 })
    quantite: number;

    @Column({
        type: 'enum',
        enum: StatutStock,
        default: StatutStock.EN_STOCK
    })
    statut: StatutStock;

    @Column({ type: 'date', nullable: true })
    date_expiration: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    seuil_alerte: number;

    @ManyToOne(() => User)
    pisciculteur: User;

    @OneToMany(() => MouvementStockAliment, mouvement => mouvement.stock_aliment)
    mouvements: MouvementStockAliment[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 