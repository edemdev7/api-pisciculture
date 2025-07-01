import { DataSource } from 'typeorm';
import { Region } from '../../regions/region.entity';
import { Departement } from '../../departements/departement.entity';

export class RegionsSeeder {
    constructor(private dataSource: DataSource) {}

    async run() {
        const regionRepository = this.dataSource.getRepository(Region);
        const departementRepository = this.dataSource.getRepository(Departement);

        // Récupérer les départements existants
        const departements = await departementRepository.find();
        const departementsMap = new Map(departements.map(d => [d.nom, d]));

        const regions = [
            {
                nom: 'Douala',
                departement: 'Littoral',
            },
            {
                nom: 'Yaoundé',
                departement: 'Centre',
            },
            {
                nom: 'Kribi',
                departement: 'Sud',
            },
            {
                nom: 'Bertoua',
                departement: 'Est',
            },
            {
                nom: 'Ngaoundéré',
                departement: 'Adamaoua',
            },
            {
                nom: 'Garoua',
                departement: 'Nord',
            },
            {
                nom: 'Maroua',
                departement: 'Extrême-Nord',
            },
        ];

        for (const regionData of regions) {
            const exists = await regionRepository.findOne({ where: { nom: regionData.nom } });
            if (!exists) {
                const departement = departementsMap.get(regionData.departement);
                if (departement) {
                    await regionRepository.save({
                        nom: regionData.nom,
                        departement: departement,
                    });
                } else {
                    console.warn(`Département ${regionData.departement} non trouvé pour la région ${regionData.nom}`);
                }
            }
        }
        console.log('Régions créées');
    }
} 