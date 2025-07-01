import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User, Role } from '../users/entities/user.entity';
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
import { Permission } from '../users/entities/permission.entity';
import { ActivitePisciculteur } from '../users/entities/activite-pisciculteur.entity';
import { AvanceIntrant } from '../avances-intrants/entities/avance-intrant.entity';
import { Remboursement } from '../avances-intrants/entities/remboursement.entity';
import { Dette } from '../avances-intrants/entities/dette.entity';
import { Region } from '../regions/region.entity';
import { Departement } from '../departements/departement.entity';
import { EvenementCalendrier } from '../calendrier/entities/evenement-calendrier.entity';
import { PerformanceBassin } from '../bassins/entities/performance-bassin.entity';
import { PecheControle } from '../bassins/entities/peche-controle.entity';
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
        Traitement,
        Role,
        Permission,
        ActivitePisciculteur,
        AvanceIntrant,
        Remboursement,
        Dette,
        Region,
        Departement,
        EvenementCalendrier,
        PerformanceBassin,
        PecheControle
    ],
    synchronize: true,
    logging: true
}); 