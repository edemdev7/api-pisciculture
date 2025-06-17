import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, StatutLecture } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private notificationsRepository: Repository<Notification>,
    ) {}

    async findAllByUser(userId: number): Promise<Notification[]> {
        return await this.notificationsRepository.find({
            where: { utilisateur: { id: userId }, est_actif: true },
            order: { created_at: 'DESC' },
        });
    }

    async findUnreadByUser(userId: number): Promise<Notification[]> {
        return await this.notificationsRepository.find({
            where: {
                utilisateur: { id: userId },
                statut_lecture: StatutLecture.NON_LU,
                est_actif: true,
            },
            order: { created_at: 'DESC' },
        });
    }

    async markAsRead(id: number): Promise<Notification> {
        const notification = await this.notificationsRepository.findOne({
            where: { id, est_actif: true },
        });
        if (!notification) {
            throw new NotFoundException(`Notification #${id} non trouvée`);
        }
        notification.statut_lecture = StatutLecture.LU;
        return await this.notificationsRepository.save(notification);
    }

    async markAllAsRead(userId: number): Promise<void> {
        await this.notificationsRepository.update(
            {
                utilisateur: { id: userId },
                statut_lecture: StatutLecture.NON_LU,
                est_actif: true,
            },
            { statut_lecture: StatutLecture.LU },
        );
    }

    async remove(id: number): Promise<void> {
        const notification = await this.notificationsRepository.findOne({
            where: { id, est_actif: true },
        });
        if (!notification) {
            throw new NotFoundException(`Notification #${id} non trouvée`);
        }
        notification.est_actif = false;
        await this.notificationsRepository.save(notification);
    }
} 