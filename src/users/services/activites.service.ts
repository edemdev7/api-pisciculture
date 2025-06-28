import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivitePisciculteur, TypeActivite } from '../entities/activite-pisciculteur.entity';
import { CreateActiviteDto } from '../dto/create-activite.dto';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class ActivitesService {
    constructor(
        @InjectRepository(ActivitePisciculteur)
        private activiteRepository: Repository<ActivitePisciculteur>,
    ) {}

    async createActivite(pisciculteurId: number, createActiviteDto: CreateActiviteDto): Promise<ActivitePisciculteur> {
        const activite = this.activiteRepository.create({
            ...createActiviteDto,
            pisciculteurId,
        });
        return await this.activiteRepository.save(activite);
    }

    async getActivitesByPisciculteur(pisciculteurId: number, page: number = 1, limit: number = 10): Promise<{ activites: ActivitePisciculteur[], total: number }> {
        const [activites, total] = await this.activiteRepository.findAndCount({
            where: { pisciculteurId },
            relations: ['pisciculteur'],
            order: { date_activite: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        return { activites, total };
    }

    async getActivitesByType(pisciculteurId: number, type: TypeActivite): Promise<ActivitePisciculteur[]> {
        return await this.activiteRepository.find({
            where: { pisciculteurId, type },
            relations: ['pisciculteur'],
            order: { date_activite: 'DESC' },
        });
    }

    async getActivitesByDateRange(pisciculteurId: number, startDate: Date, endDate: Date): Promise<ActivitePisciculteur[]> {
        return await this.activiteRepository
            .createQueryBuilder('activite')
            .where('activite.pisciculteurId = :pisciculteurId', { pisciculteurId })
            .andWhere('activite.date_activite BETWEEN :startDate AND :endDate', { startDate, endDate })
            .orderBy('activite.date_activite', 'DESC')
            .getMany();
    }

    async getStatistiquesActivites(pisciculteurId: number): Promise<any> {
        const stats = await this.activiteRepository
            .createQueryBuilder('activite')
            .select('activite.type', 'type')
            .addSelect('COUNT(*)', 'count')
            .where('activite.pisciculteurId = :pisciculteurId', { pisciculteurId })
            .groupBy('activite.type')
            .getRawMany();

        return stats;
    }
} 