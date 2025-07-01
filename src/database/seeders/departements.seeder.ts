import { DataSource } from 'typeorm';
import { Departement } from '../../departements/departement.entity';

export class DepartementsSeeder {
    constructor(private dataSource: DataSource) {}

    async run() {
        const departementRepository = this.dataSource.getRepository(Departement);

        const departements = [
            {
                nom: 'Littoral',
            },
            {
                nom: 'Centre',
            },
            {
                nom: 'Sud',
            },
            {
                nom: 'Est',
            },
            {
                nom: 'Adamaoua',
            },
            {
                nom: 'Nord',
            },
            {
                nom: 'Extrême-Nord',
            },
            {
                nom: 'Nord-Ouest',
            },
            {
                nom: 'Ouest',
            },
            {
                nom: 'Sud-Ouest',
            },
        ];

        for (const departementData of departements) {
            const exists = await departementRepository.findOne({ where: { nom: departementData.nom } });
            if (!exists) {
                await departementRepository.save(departementData);
            }
        }
        console.log('Départements créés');
    }
} 