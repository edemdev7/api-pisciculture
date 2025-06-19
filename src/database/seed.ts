import { AppDataSource } from './data-source';
import { RolesSeeder } from './seeders/roles.seeder';
import { AdminSeeder } from './seeders/admin.seeder';

async function runSeeders() {
    try {
        // Initialiser la connexion à la base de données
        await AppDataSource.initialize();
        console.log('Connexion à la base de données établie');

        // Exécuter les seeders
        await new RolesSeeder(AppDataSource).run();
        await new AdminSeeder(AppDataSource).run();

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

runSeeders().catch((err) => {
    console.error('Erreur lors de l\'exécution des seeders:', err);
}); 