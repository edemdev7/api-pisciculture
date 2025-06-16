import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../users/entities/user.entity';
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
                est_actif: true
            });

            await userRepository.save(admin);
            console.log('Compte administrateur créé avec succès');
        } else {
            console.log('Le compte administrateur existe déjà');
        }
    }
} 