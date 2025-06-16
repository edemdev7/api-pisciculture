import { DataSource } from 'typeorm';
import { User, Role, UserStatus } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export class AdminSeeder {
    constructor(private dataSource: DataSource) {}

    async run() {
        const userRepository = this.dataSource.getRepository(User);

        // Vérifier si l'admin existe déjà
        const adminExists = await userRepository.findOne({
            where: { email: 'admin@pisciculture.com' }
        });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            
            const admin = userRepository.create({
                nom: 'Admin',
                prenom: 'System',
                email: 'admin@pisciculture.com',
                password: hashedPassword,
                telephone: '+237600000000',
                role: Role.ADMIN,
                est_actif: true,
                statut: UserStatus.ACTIF,
                est_verifie: true,
                premiere_connexion: false
            });

            await userRepository.save(admin);
            console.log('Compte administrateur créé avec succès');
        } else {
            // Mettre à jour le mot de passe de l'admin existant
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await userRepository.update(
                { email: 'admin@pisciculture.com' },
                {
                    password: hashedPassword,
                    est_actif: true,
                    statut: UserStatus.ACTIF,
                    est_verifie: true
                }
            );
            console.log('Compte administrateur mis à jour avec succès');
        }
    }
} 