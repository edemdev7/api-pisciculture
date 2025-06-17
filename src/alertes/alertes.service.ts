import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alerte, StatutAlerte } from './entities/alerte.entity';
import { CreateAlerteDto } from './dto/create-alerte.dto';
import { User } from '../users/entities/user.entity';
import { Notification, StatutLecture } from './entities/notification.entity';

@Injectable()
export class AlertesService {
    constructor(
        @InjectRepository(Alerte)
        private alertesRepository: Repository<Alerte>,
        @InjectRepository(Notification)
        private notificationsRepository: Repository<Notification>,
    ) {}

    async create(createAlerteDto: CreateAlerteDto, user: User): Promise<Alerte> {
        const alerte = this.alertesRepository.create({
            ...createAlerteDto,
            pisciculteur: user,
        });
        const savedAlerte = await this.alertesRepository.save(alerte);

        // Créer une notification pour l'admin
        const adminNotification = this.notificationsRepository.create({
            alerte: savedAlerte,
            utilisateur: user,
            statut_lecture: StatutLecture.NON_LU,
        });
        await this.notificationsRepository.save(adminNotification);

        return savedAlerte;
    }

    async findAll(): Promise<Alerte[]> {
        return await this.alertesRepository.find({
            where: { est_actif: true },
            order: { created_at: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Alerte> {
        const alerte = await this.alertesRepository.findOne({
            where: { id, est_actif: true },
        });
        if (!alerte) {
            throw new NotFoundException(`Alerte #${id} non trouvée`);
        }
        return alerte;
    }

    async findByPisciculteur(userId: number): Promise<Alerte[]> {
        return await this.alertesRepository.find({
            where: { pisciculteur: { id: userId }, est_actif: true },
            order: { created_at: 'DESC' },
        });
    }

    async updateStatut(id: number, statut: StatutAlerte): Promise<Alerte> {
        const alerte = await this.findOne(id);
        alerte.statut = statut;
        return await this.alertesRepository.save(alerte);
    }

    async remove(id: number): Promise<void> {
        const alerte = await this.findOne(id);
        alerte.est_actif = false;
        await this.alertesRepository.save(alerte);
    }
} 