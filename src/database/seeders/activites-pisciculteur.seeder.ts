import { DataSource } from 'typeorm';
import { ActivitePisciculteur, TypeActivite } from '../../users/entities/activite-pisciculteur.entity';
import { User } from '../../users/entities/user.entity';

interface ActiviteData {
    type: TypeActivite;
    description: string;
    donnees?: any;
    ip_address?: string;
    user_agent?: string;
    date_activite: Date;
    pisciculteurId: number;
}

export class ActivitesPisciculteurSeeder {
    constructor(private dataSource: DataSource) {}

    async run() {
        const activiteRepository = this.dataSource.getRepository(ActivitePisciculteur);
        const userRepository = this.dataSource.getRepository(User);

        // Vérifier si le pisciculteur avec l'ID 7 existe
        const pisciculteur = await userRepository.findOne({
            where: { id: 7 }
        });

        if (!pisciculteur) {
            console.log('Pisciculteur avec l\'ID 7 non trouvé. Création d\'activités annulée.');
            return;
        }

        // Vérifier s'il y a déjà des activités pour ce pisciculteur
        const existingActivities = await activiteRepository.count({
            where: { pisciculteurId: 7 }
        });

        if (existingActivities > 0) {
            console.log(`Le pisciculteur avec l'ID 7 a déjà ${existingActivities} activités. Suppression des anciennes activités...`);
            await activiteRepository.delete({ pisciculteurId: 7 });
        }

        // Générer des activités variées pour les 30 derniers jours
        const activites: ActiviteData[] = [];
        const now = new Date();
        
        // Activités de connexion (quotidiennes)
        for (let i = 0; i < 30; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            date.setHours(8 + Math.floor(Math.random() * 8));
            date.setMinutes(Math.floor(Math.random() * 60));
            
            activites.push({
                type: TypeActivite.CONNEXION,
                description: 'Connexion à la plateforme de gestion piscicole',
                donnees: {
                    session_duration: Math.floor(Math.random() * 120) + 30,
                    pages_visited: Math.floor(Math.random() * 10) + 1
                },
                ip_address: `192.168.1.${Math.floor(Math.random() * 255) + 1}`,
                user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                date_activite: date,
                pisciculteurId: 7
            });
        }

        // Activités de création de bassins
        const bassinsActivites: ActiviteData[] = [
            {
                type: TypeActivite.CREATION_BASSIN,
                description: 'Création du bassin principal de production',
                donnees: {
                    nom_bassin: 'Bassin Principal',
                    superficie: 500,
                    profondeur: 1.5,
                    type_poisson: 'Tilapia'
                },
                date_activite: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000),
                pisciculteurId: 7
            },
            {
                type: TypeActivite.CREATION_BASSIN,
                description: 'Création du bassin de reproduction',
                donnees: {
                    nom_bassin: 'Bassin de Reproduction',
                    superficie: 200,
                    profondeur: 1.2,
                    type_poisson: 'Tilapia reproducteur'
                },
                date_activite: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
                pisciculteurId: 7
            }
        ];
        activites.push(...bassinsActivites);

        // Activités d'ajout de poissons
        for (let i = 0; i < 5; i++) {
            const date = new Date(now.getTime() - (15 - i * 3) * 24 * 60 * 60 * 1000);
            activites.push({
                type: TypeActivite.AJOUT_POISSON,
                description: `Ajout de ${Math.floor(Math.random() * 500) + 100} alevins de Tilapia`,
                donnees: {
                    nombre_poissons: Math.floor(Math.random() * 500) + 100,
                    type_poisson: 'Tilapia',
                    poids_moyen: (Math.random() * 0.05 + 0.01).toFixed(3),
                    bassin_destination: `Bassin ${i + 1}`
                },
                date_activite: date,
                pisciculteurId: 7
            });
        }

        // Activités de distribution d'aliments
        for (let i = 0; i < 25; i++) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            date.setHours(7 + Math.floor(Math.random() * 2));
            
            activites.push({
                type: TypeActivite.DISTRIBUTION_ALIMENT,
                description: 'Distribution quotidienne d\'aliments aux poissons',
                donnees: {
                    quantite_distribuee: Math.floor(Math.random() * 20) + 10,
                    type_aliment: 'Granulés flottants',
                    frequence: '2 fois par jour',
                    bassins_concernes: ['Bassin Principal', 'Bassin de Reproduction']
                },
                date_activite: date,
                pisciculteurId: 7
            });
        }

        // Activités de diagnostic de maladies
        const diagnosticsActivites: ActiviteData[] = [
            {
                type: TypeActivite.DIAGNOSTIC_MALADIE,
                description: 'Diagnostic de maladie bactérienne détectée',
                donnees: {
                    symptomes: ['Nageoires déchirées', 'Comportement anormal'],
                    maladie_suspectee: 'Columnaris',
                    nombre_poissons_affectes: 15,
                    bassin_concerne: 'Bassin Principal'
                },
                date_activite: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
                pisciculteurId: 7
            },
            {
                type: TypeActivite.DIAGNOSTIC_MALADIE,
                description: 'Contrôle de routine - Aucune maladie détectée',
                donnees: {
                    symptomes: 'Aucun',
                    maladie_suspectee: 'Aucune',
                    nombre_poissons_affectes: 0,
                    bassin_concerne: 'Tous les bassins'
                },
                date_activite: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
                pisciculteurId: 7
            }
        ];
        activites.push(...diagnosticsActivites);

        // Activités de traitement
        const traitementsActivites: ActiviteData[] = [
            {
                type: TypeActivite.TRAITEMENT,
                description: 'Traitement antibiotique pour maladie bactérienne',
                donnees: {
                    medicament_utilise: 'Oxytétracycline',
                    dosage: '50mg/kg d\'aliment',
                    duree_traitement: '5 jours',
                    nombre_poissons_traites: 15,
                    bassin_concerne: 'Bassin Principal'
                },
                date_activite: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000),
                pisciculteurId: 7
            }
        ];
        activites.push(...traitementsActivites);

        // Activités de mesure d'eau
        for (let i = 0; i < 15; i++) {
            const date = new Date(now.getTime() - i * 2 * 24 * 60 * 60 * 1000);
            activites.push({
                type: TypeActivite.MESURE_EAU,
                description: 'Contrôle de la qualité de l\'eau',
                donnees: {
                    temperature: (Math.random() * 5 + 25).toFixed(1),
                    ph: (Math.random() * 2 + 6.5).toFixed(1),
                    oxygene_dissous: (Math.random() * 2 + 5).toFixed(1),
                    ammoniac: (Math.random() * 0.5).toFixed(2),
                    bassin_concerne: 'Bassin Principal'
                },
                date_activite: date,
                pisciculteurId: 7
            });
        }

        // Activités de maintenance d'équipement
        const maintenanceActivites: ActiviteData[] = [
            {
                type: TypeActivite.MAINTENANCE_EQUIPEMENT,
                description: 'Maintenance préventive du système d\'aération',
                donnees: {
                    equipement: 'Aérateur principal',
                    type_maintenance: 'Préventive',
                    duree_intervention: '2 heures',
                    pieces_remplacees: ['Filtre à air', 'Huile moteur']
                },
                date_activite: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
                pisciculteurId: 7
            },
            {
                type: TypeActivite.MAINTENANCE_EQUIPEMENT,
                description: 'Réparation du système de pompage',
                donnees: {
                    equipement: 'Pompe d\'alimentation',
                    type_maintenance: 'Corrective',
                    duree_intervention: '4 heures',
                    pieces_remplacees: ['Joint d\'étanchéité', 'Roulement']
                },
                date_activite: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
                pisciculteurId: 7
            }
        ];
        activites.push(...maintenanceActivites);

        // Activités de récolte
        const recoltesActivites: ActiviteData[] = [
            {
                type: TypeActivite.RECOLTE,
                description: 'Récolte partielle de Tilapia',
                donnees: {
                    quantite_recoltee: 150,
                    poids_total: 75,
                    poids_moyen_poisson: 0.5,
                    bassin_origine: 'Bassin Principal',
                    taux_survie: 85
                },
                date_activite: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
                pisciculteurId: 7
            }
        ];
        activites.push(...recoltesActivites);

        // Activités de vente
        const ventesActivites: ActiviteData[] = [
            {
                type: TypeActivite.VENTE,
                description: 'Vente de Tilapia au marché local',
                donnees: {
                    quantite_vendue: 100,
                    prix_unitaire: 2500,
                    prix_total: 250000,
                    client: 'Marché central',
                    mode_paiement: 'Espèces'
                },
                date_activite: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
                pisciculteurId: 7
            }
        ];
        activites.push(...ventesActivites);

        // Activités diverses
        const autresActivites: ActiviteData[] = [
            {
                type: TypeActivite.AUTRE,
                description: 'Formation sur les bonnes pratiques piscicoles',
                donnees: {
                    theme_formation: 'Gestion de la qualité de l\'eau',
                    duree: '3 heures',
                    formateur: 'Expert régional'
                },
                date_activite: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000),
                pisciculteurId: 7
            },
            {
                type: TypeActivite.AUTRE,
                description: 'Visite technique de l\'agent de vulgarisation',
                donnees: {
                    agent: 'Agent de vulgarisation départemental',
                    observations: 'Bonne gestion générale, recommandations pour améliorer l\'aération',
                    recommandations: ['Augmenter l\'aération nocturne', 'Surveiller le pH']
                },
                date_activite: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
                pisciculteurId: 7
            }
        ];
        activites.push(...autresActivites);

        // Génération pour le pisciculteur avec l'ID 8
        const pisciculteur8 = await userRepository.findOne({ where: { id: 8 } });
        if (pisciculteur8) {
            const existingActivities8 = await activiteRepository.count({ where: { pisciculteurId: 8 } });
            if (existingActivities8 > 0) {
                console.log(`Le pisciculteur avec l'ID 8 a déjà ${existingActivities8} activités. Suppression des anciennes activités...`);
                await activiteRepository.delete({ pisciculteurId: 8 });
            }
            const activites8: ActiviteData[] = [];
            const now8 = new Date();
            // 1. Connexion
            activites8.push({
                type: TypeActivite.CONNEXION,
                description: 'Connexion à la plateforme',
                donnees: { session_duration: 60, pages_visited: 5 },
                ip_address: '192.168.1.101',
                user_agent: 'Mozilla/5.0',
                date_activite: new Date(now8.getTime() - 1 * 24 * 60 * 60 * 1000),
                pisciculteurId: 8
            });
            // 2. Création bassin
            activites8.push({
                type: TypeActivite.CREATION_BASSIN,
                description: 'Création d\'un nouveau bassin',
                donnees: { nom_bassin: 'Bassin 8A', superficie: 300, profondeur: 1.3, type_poisson: 'Clarias' },
                date_activite: new Date(now8.getTime() - 2 * 24 * 60 * 60 * 1000),
                pisciculteurId: 8
            });
            // 3. Ajout poisson
            activites8.push({
                type: TypeActivite.AJOUT_POISSON,
                description: 'Ajout de 200 alevins de Clarias',
                donnees: { nombre_poissons: 200, type_poisson: 'Clarias', poids_moyen: 0.02, bassin_destination: 'Bassin 8A' },
                date_activite: new Date(now8.getTime() - 3 * 24 * 60 * 60 * 1000),
                pisciculteurId: 8
            });
            // 4. Distribution aliment
            activites8.push({
                type: TypeActivite.DISTRIBUTION_ALIMENT,
                description: 'Distribution d\'aliment',
                donnees: { quantite_distribuee: 15, type_aliment: 'Granulés', frequence: '1 fois par jour', bassins_concernes: ['Bassin 8A'] },
                date_activite: new Date(now8.getTime() - 4 * 24 * 60 * 60 * 1000),
                pisciculteurId: 8
            });
            // 5. Diagnostic maladie
            activites8.push({
                type: TypeActivite.DIAGNOSTIC_MALADIE,
                description: 'Diagnostic de routine',
                donnees: { symptomes: 'Aucun', maladie_suspectee: 'Aucune', nombre_poissons_affectes: 0, bassin_concerne: 'Bassin 8A' },
                date_activite: new Date(now8.getTime() - 5 * 24 * 60 * 60 * 1000),
                pisciculteurId: 8
            });
            // 6. Traitement
            activites8.push({
                type: TypeActivite.TRAITEMENT,
                description: 'Traitement préventif',
                donnees: { medicament_utilise: 'Sel', dosage: '10g/L', duree_traitement: '2 jours', nombre_poissons_traites: 200, bassin_concerne: 'Bassin 8A' },
                date_activite: new Date(now8.getTime() - 6 * 24 * 60 * 60 * 1000),
                pisciculteurId: 8
            });
            // 7. Mesure eau
            activites8.push({
                type: TypeActivite.MESURE_EAU,
                description: 'Mesure de la qualité de l\'eau',
                donnees: { temperature: 27.5, ph: 7.2, oxygene_dissous: 6.0, ammoniac: 0.1, bassin_concerne: 'Bassin 8A' },
                date_activite: new Date(now8.getTime() - 7 * 24 * 60 * 60 * 1000),
                pisciculteurId: 8
            });
            // 8. Maintenance équipement
            activites8.push({
                type: TypeActivite.MAINTENANCE_EQUIPEMENT,
                description: 'Maintenance de la pompe',
                donnees: { equipement: 'Pompe', type_maintenance: 'Préventive', duree_intervention: '1 heure', pieces_remplacees: ['Filtre'] },
                date_activite: new Date(now8.getTime() - 8 * 24 * 60 * 60 * 1000),
                pisciculteurId: 8
            });
            // 9. Récolte
            activites8.push({
                type: TypeActivite.RECOLTE,
                description: 'Récolte partielle',
                donnees: { quantite_recoltee: 50, poids_total: 25, poids_moyen_poisson: 0.5, bassin_origine: 'Bassin 8A', taux_survie: 90 },
                date_activite: new Date(now8.getTime() - 9 * 24 * 60 * 60 * 1000),
                pisciculteurId: 8
            });
            // 10. Vente
            activites8.push({
                type: TypeActivite.VENTE,
                description: 'Vente au marché',
                donnees: { quantite_vendue: 40, prix_unitaire: 3000, prix_total: 120000, client: 'Marché local', mode_paiement: 'Espèces' },
                date_activite: new Date(now8.getTime() - 10 * 24 * 60 * 60 * 1000),
                pisciculteurId: 8
            });
            await activiteRepository.save(activites8);
            console.log('10 activités générées avec succès pour le pisciculteur avec l\'ID 8');
        } else {
            console.log('Pisciculteur avec l\'ID 8 non trouvé.');
        }

        // Sauvegarder toutes les activités
        await activiteRepository.save(activites);

        console.log(`${activites.length} activités générées avec succès pour le pisciculteur avec l'ID 7`);
        console.log('Types d\'activités créées :');
        const typesCount: Record<string, number> = {};
        activites.forEach(activite => {
            typesCount[activite.type] = (typesCount[activite.type] || 0) + 1;
        });
        Object.entries(typesCount).forEach(([type, count]) => {
            console.log(`  - ${type}: ${count} activités`);
        });
    }
} 