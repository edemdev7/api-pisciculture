import { AppDataSource } from './data-source';
import { PerformancesBassinSeeder } from './seeders/performances-bassin.seeder';
import { PechesControleSeeder } from './seeders/peches-controle.seeder';

async function runPerformancesPechesSeeders() {
    try {
        // Initialiser la connexion à la base de données
        await AppDataSource.initialize();
        console.log('Connexion à la base de données établie');

        console.log('=== Début de l\'exécution des seeders de performances et pêches contrôle ===');

        // Exécuter les seeders de performances et pêches contrôle
        await new PerformancesBassinSeeder(AppDataSource).run();
        await new PechesControleSeeder(AppDataSource).run();

        console.log('=== Seeders de performances et pêches contrôle exécutés avec succès ===');
    } catch (error) {
        console.error('Erreur lors de l\'exécution des seeders:', error);
    } finally {
        // Fermer la connexion
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

runPerformancesPechesSeeders().catch((err) => {
    console.error('Erreur lors de l\'exécution des seeders:', err);
}); 