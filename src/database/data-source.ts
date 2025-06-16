import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Bassin } from '../bassins/entities/bassin.entity';
import { PisciculteurBassin } from '../bassins/entities/pisciculteur-bassin.entity';
import { Aliment } from '../aliments/entities/aliment.entity';
import { StockAliment } from '../aliments/entities/stock-aliment.entity';
import { MouvementStockAliment } from '../aliments/entities/mouvement-stock-aliment.entity';
import { DistributionAliment } from '../aliments/entities/distribution-aliment.entity';
import { Intrant } from '../intrants/entities/intrant.entity';
import { LivraisonIntrant } from '../intrants/entities/livraison-intrant.entity';
import { Stock } from '../stocks/entities/stock.entity';
import { MouvementStock } from '../stocks/entities/mouvement-stock.entity';
import { Maladie } from '../maladies/entities/maladie.entity';
import { Diagnostic } from '../maladies/entities/diagnostic.entity';
import { Traitement } from '../maladies/entities/traitement.entity';

config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'pisciculture',
    entities: [
        User,
        Bassin,
        PisciculteurBassin,
        Aliment,
        StockAliment,
        MouvementStockAliment,
        DistributionAliment,
        Intrant,
        LivraisonIntrant,
        Stock,
        MouvementStock,
        Maladie,
        Diagnostic,
        Traitement
    ],
    synchronize: true,
    logging: true
}); 