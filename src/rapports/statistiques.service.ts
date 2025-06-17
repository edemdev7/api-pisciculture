import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statistique, TypeStatistique } from './entities/statistique.entity';
import { CreateStatistiqueDto } from './dto/create-statistique.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class StatistiquesService {
    constructor(
        @InjectRepository(Statistique)
        private statistiquesRepository: Repository<Statistique>,
    ) {}

    async create(createStatistiqueDto: CreateStatistiqueDto, user: User): Promise<Statistique> {
        const statistique = this.statistiquesRepository.create({
            ...createStatistiqueDto,
            created_by: user,
        });
        return await this.statistiquesRepository.save(statistique);
    }

    async findAll(): Promise<Statistique[]> {
        return await this.statistiquesRepository.find({
            where: { est_actif: true },
            order: { periode_debut: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Statistique> {
        const statistique = await this.statistiquesRepository.findOne({
            where: { id, est_actif: true },
        });
        if (!statistique) {
            throw new NotFoundException(`Statistique #${id} non trouvée`);
        }
        return statistique;
    }

    async findByType(type: TypeStatistique): Promise<Statistique[]> {
        return await this.statistiquesRepository.find({
            where: { type, est_actif: true },
            order: { periode_debut: 'DESC' },
        });
    }

    async findByPeriode(debut: Date, fin: Date): Promise<Statistique[]> {
        return await this.statistiquesRepository.find({
            where: {
                periode_debut: debut,
                periode_fin: fin,
                est_actif: true,
            },
            order: { periode_debut: 'DESC' },
        });
    }

    async remove(id: number): Promise<void> {
        const statistique = await this.findOne(id);
        statistique.est_actif = false;
        await this.statistiquesRepository.save(statistique);
    }
} 