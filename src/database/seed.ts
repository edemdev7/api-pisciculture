import { AppDataSource } from './data-source';
import { AdminSeeder } from './seeders/admin.seeder';

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
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

runSeeders(); 