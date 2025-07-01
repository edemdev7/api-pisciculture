import { DataSource } from 'typeorm';
import { PerformanceBassin } from '../../bassins/entities/performance-bassin.entity';
import { Bassin } from '../../bassins/entities/bassin.entity';

export class PerformancesBassinSeeder {
    constructor(private dataSource: DataSource) {}

    async run() {
        const performanceRepository = this.dataSource.getRepository(PerformanceBassin);
        const bassinRepository = this.dataSource.getRepository(Bassin);

        // Récupérer les bassins existants
        const bassin1 = await bassinRepository.findOne({ where: { id: 2 } }); // Grand bassin
        const bassin2 = await bassinRepository.findOne({ where: { id: 3 } }); // BASSIN

        if (!bassin1 || !bassin2) {
            console.log('Bassins non trouvés, impossible de créer les performances');
            return;
        }

        // Données de performance pour le Grand bassin (Bassin de pêche)
        const performancesBassin1 = [
            {
                date_mesure: new Date('2024-01-15'),
                nombre_poissons: 1500,
                poids_total: 4500.00,
                poids_moyen: 3.00,
                taux_mortalite: 2.50,
                taux_croissance: 15.20,
                taux_conversion_alimentaire: 1.8,
                observations: 'Croissance excellente, mortalité faible',
                bassinId: bassin1.id
            },
            {
                date_mesure: new Date('2024-02-15'),
                nombre_poissons: 1480,
                poids_total: 5200.00,
                poids_moyen: 3.51,
                taux_mortalite: 1.33,
                taux_croissance: 17.00,
                taux_conversion_alimentaire: 1.7,
                observations: 'Performance stable, bonne conversion alimentaire',
                bassinId: bassin1.id
            },
            {
                date_mesure: new Date('2024-03-15'),
                nombre_poissons: 1465,
                poids_total: 6100.00,
                poids_moyen: 4.16,
                taux_mortalite: 1.01,
                taux_croissance: 18.50,
                taux_conversion_alimentaire: 1.6,
                observations: 'Croissance optimale, poissons en bonne santé',
                bassinId: bassin1.id
            }
        ];

        // Données de performance pour le BASSIN (Bassin de récolte)
        const performancesBassin2 = [
            {
                date_mesure: new Date('2024-01-20'),
                nombre_poissons: 800,
                poids_total: 2400.00,
                poids_moyen: 3.00,
                taux_mortalite: 3.00,
                taux_croissance: 14.50,
                taux_conversion_alimentaire: 2.0,
                observations: 'Début de cycle, mortalité normale',
                bassinId: bassin2.id
            },
            {
                date_mesure: new Date('2024-02-20'),
                nombre_poissons: 780,
                poids_total: 2800.00,
                poids_moyen: 3.59,
                taux_mortalite: 2.56,
                taux_croissance: 19.67,
                taux_conversion_alimentaire: 1.9,
                observations: 'Croissance rapide, adaptation au bassin',
                bassinId: bassin2.id
            },
            {
                date_mesure: new Date('2024-03-20'),
                nombre_poissons: 765,
                poids_total: 3300.00,
                poids_moyen: 4.31,
                taux_mortalite: 1.92,
                taux_croissance: 20.06,
                taux_conversion_alimentaire: 1.8,
                observations: 'Performance excellente, prêt pour la récolte',
                bassinId: bassin2.id
            }
        ];

        // Créer les performances pour le bassin 1
        for (const performanceData of performancesBassin1) {
            const existingPerformance = await performanceRepository.findOne({
                where: {
                    bassinId: performanceData.bassinId,
                    date_mesure: performanceData.date_mesure
                }
            });

            if (!existingPerformance) {
                const performance = new PerformanceBassin();
                Object.assign(performance, performanceData);
                await performanceRepository.save(performance);
                console.log(`Performance créée pour le bassin ${bassin1.nom} - ${performanceData.date_mesure.toLocaleDateString()}`);
            }
        }

        // Créer les performances pour le bassin 2
        for (const performanceData of performancesBassin2) {
            const existingPerformance = await performanceRepository.findOne({
                where: {
                    bassinId: performanceData.bassinId,
                    date_mesure: performanceData.date_mesure
                }
            });

            if (!existingPerformance) {
                const performance = new PerformanceBassin();
                Object.assign(performance, performanceData);
                await performanceRepository.save(performance);
                console.log(`Performance créée pour le bassin ${bassin2.nom} - ${performanceData.date_mesure.toLocaleDateString()}`);
            }
        }

        console.log('Seeder des performances de bassin terminé');
    }
} 