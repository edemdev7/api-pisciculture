import { DataSource } from 'typeorm';
import { User, UserStatus } from '../../users/entities/user.entity';
import { Role } from '../../users/entities/role.entity';
import * as bcrypt from 'bcrypt';

export class AdminSeeder {
    constructor(private dataSource: DataSource) {}

    async run() {
        const userRepository = this.dataSource.getRepository(User);
        const roleRepository = this.dataSource.getRepository(Role);

        // Vérifier si l'admin existe déjà
        const adminExists = await userRepository.findOne({
            where: { email: 'admin@pisciculture.com' }
        });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            const adminRole = await roleRepository.findOne({ where: { code: 'ADMIN' } });
            
            if (!adminRole) {
                throw new Error('Rôle admin non trouvé');
            }

            const admin = new User();
            admin.username = 'admin';
            admin.nom = 'Admin';
            admin.prenom = 'System';
            admin.email = 'admin@pisciculture.com';
            admin.password = hashedPassword;
            admin.telephone = '+237600000000';
            admin.roleId = adminRole.id;
            admin.status = UserStatus.ACTIF;

            await userRepository.save(admin);
            console.log('Compte administrateur créé avec succès');
        } else {
            // Mettre à jour le mot de passe de l'admin existant
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await userRepository.update(
                { email: 'admin@pisciculture.com' },
                {
                    password: hashedPassword,
                    status: UserStatus.ACTIF
                }
            );
            console.log('Compte administrateur mis à jour avec succès');
        }
    }
} 