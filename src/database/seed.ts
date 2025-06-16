import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { AdminSeeder } from './seeders/admin.seeder';
import { User } from '../users/entities/user.entity';

config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'pisciculture',
    entities: [User],
    synchronize: true,
});

async function runSeeders() {
    try {
        // Initialiser la connexion à la base de données
        await AppDataSource.initialize();
        console.log('Connexion à la base de données établie');

        // Exécuter les seeders
        const adminSeeder = new AdminSeeder(AppDataSource);
        await adminSeeder.run();

        console.log('Seeders exécutés avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'exécution des seeders:', error);
    } finally {
        // Fermer la connexion
        await AppDataSource.destroy();
    }
}

runSeeders(); 