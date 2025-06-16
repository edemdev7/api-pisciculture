import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { StockAliment } from './stock-aliment.entity';
import { User } from '../../users/entities/user.entity';

export enum TypeMouvement {
    ENTREE = 'ENTREE',
    SORTIE = 'SORTIE',
    AJUSTEMENT = 'AJUSTEMENT'
}

@Entity('mouvement_stock_aliment')
export class MouvementStockAliment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => StockAliment)
    stock_aliment: StockAliment;

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

    @Column({ nullable: true })
    commentaire: string;

    @ManyToOne(() => User)
    pisciculteur: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
} 