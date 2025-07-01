import { DataSource } from 'typeorm';
import { PecheControle } from '../../bassins/entities/peche-controle.entity';
import { Bassin } from '../../bassins/entities/bassin.entity';
import { User } from '../../users/entities/user.entity';

export class PechesControleSeeder {
    constructor(private dataSource: DataSource) {}

    async run() {
        const pecheRepository = this.dataSource.getRepository(PecheControle);
        const bassinRepository = this.dataSource.getRepository(Bassin);
        const userRepository = this.dataSource.getRepository(User);

        // Récupérer les bassins existants
        const bassin1 = await bassinRepository.findOne({ where: { id: 2 } }); // Grand bassin
        const bassin2 = await bassinRepository.findOne({ where: { id: 3 } }); // BASSIN

        // Récupérer un pisciculteur pour les pêches contrôle
        const pisciculteur = await userRepository.findOne({
            where: { email: 'pisciculteur1@pisciculture.com' }
        });

        if (!bassin1 || !bassin2) {
            console.log('Bassins non trouvés, impossible de créer les pêches contrôle');
            return;
        }

        if (!pisciculteur) {
            console.log('Pisciculteur non trouvé, impossible de créer les pêches contrôle');
            return;
        }

        // Données de pêche contrôle pour le Grand bassin (Bassin de pêche)
        const pechesBassin1 = [
            {
                date_peche: new Date('2024-01-10'),
                nombre_poissons_peches: 50,
                poids_total_peche: 150.00,
                poids_moyen_poisson: 3.00,
                taille_moyenne: 25.50,
                etat_sante: 'Excellent',
                observations: 'Poissons en parfaite santé, croissance normale',
                methode_peche: 'Filet maillant',
                bassinId: bassin1.id,
                pisciculteurId: pisciculteur.id
            },
            {
                date_peche: new Date('2024-02-10'),
                nombre_poissons_peches: 45,
                poids_total_peche: 165.00,
                poids_moyen_poisson: 3.67,
                taille_moyenne: 28.20,
                etat_sante: 'Très bon',
                observations: 'Croissance conforme aux attentes, pas de signes de maladie',
                methode_peche: 'Filet maillant',
                bassinId: bassin1.id,
                pisciculteurId: pisciculteur.id
            },
            {
                date_peche: new Date('2024-03-10'),
                nombre_poissons_peches: 40,
                poids_total_peche: 180.00,
                poids_moyen_poisson: 4.50,
                taille_moyenne: 32.10,
                etat_sante: 'Excellent',
                observations: 'Poissons prêts pour la récolte commerciale',
                methode_peche: 'Filet maillant',
                bassinId: bassin1.id,
                pisciculteurId: pisciculteur.id
            }
        ];

        // Données de pêche contrôle pour le BASSIN (Bassin de récolte)
        const pechesBassin2 = [
            {
                date_peche: new Date('2024-01-25'),
                nombre_poissons_peches: 30,
                poids_total_peche: 90.00,
                poids_moyen_poisson: 3.00,
                taille_moyenne: 24.80,
                etat_sante: 'Bon',
                observations: 'Adaptation au nouveau bassin en cours',
                methode_peche: 'Filet maillant',
                bassinId: bassin2.id,
                pisciculteurId: pisciculteur.id
            },
            {
                date_peche: new Date('2024-02-25'),
                nombre_poissons_peches: 35,
                poids_total_peche: 125.00,
                poids_moyen_poisson: 3.57,
                taille_moyenne: 27.50,
                etat_sante: 'Très bon',
                observations: 'Adaptation réussie, croissance accélérée',
                methode_peche: 'Filet maillant',
                bassinId: bassin2.id,
                pisciculteurId: pisciculteur.id
            },
            {
                date_peche: new Date('2024-03-25'),
                nombre_poissons_peches: 30,
                poids_total_peche: 135.00,
                poids_moyen_poisson: 4.50,
                taille_moyenne: 31.20,
                etat_sante: 'Excellent',
                observations: 'Performance optimale, récolte prévue dans 2 semaines',
                methode_peche: 'Filet maillant',
                bassinId: bassin2.id,
                pisciculteurId: pisciculteur.id
            }
        ];

        // Créer les pêches contrôle pour le bassin 1
        for (const pecheData of pechesBassin1) {
            const existingPeche = await pecheRepository.findOne({
                where: {
                    bassinId: pecheData.bassinId,
                    date_peche: pecheData.date_peche
                }
            });

            if (!existingPeche) {
                const peche = new PecheControle();
                Object.assign(peche, pecheData);
                await pecheRepository.save(peche);
                console.log(`Pêche contrôle créée pour le bassin ${bassin1.nom} - ${pecheData.date_peche.toLocaleDateString()}`);
            }
        }

        // Créer les pêches contrôle pour le bassin 2
        for (const pecheData of pechesBassin2) {
            const existingPeche = await pecheRepository.findOne({
                where: {
                    bassinId: pecheData.bassinId,
                    date_peche: pecheData.date_peche
                }
            });

            if (!existingPeche) {
                const peche = new PecheControle();
                Object.assign(peche, pecheData);
                await pecheRepository.save(peche);
                console.log(`Pêche contrôle créée pour le bassin ${bassin2.nom} - ${pecheData.date_peche.toLocaleDateString()}`);
            }
        }

        console.log('Seeder des pêches contrôle terminé');
    }
} 