import { DataSource } from 'typeorm';
import { Role } from '../../users/entities/role.entity';
import { RoleEnum } from '../../users/enums/role.enum';

export class RolesSeeder {
    constructor(private dataSource: DataSource) {}

    async run() {
        const roleRepository = this.dataSource.getRepository(Role);

        const roles = [
            {
                nom: 'Administrateur',
                description: 'Accès complet à la plateforme',
                code: RoleEnum.ADMIN,
                niveau: 100,
                est_actif: true,
            },
            {
                nom: 'Pisciculteur',
                description: 'Gestion des bassins et opérations courantes',
                code: RoleEnum.PISCICULTEUR,
                niveau: 10,
                est_actif: true,
            },
        ];

        for (const roleData of roles) {
            const exists = await roleRepository.findOne({ where: { code: roleData.code } });
            if (!exists) {
                await roleRepository.save(roleData);
            }
        }
        console.log('Rôles de base créés');
    }
} 