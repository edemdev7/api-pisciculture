import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rapport } from './entities/rapport.entity';
import { CreateRapportDto } from './dto/create-rapport.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RapportsService {
    constructor(
        @InjectRepository(Rapport)
        private rapportsRepository: Repository<Rapport>,
    ) {}

    async create(createRapportDto: CreateRapportDto, user: User): Promise<Rapport> {
        const rapport = this.rapportsRepository.create({
            ...createRapportDto,
            pisciculteur: user,
        });
        return await this.rapportsRepository.save(rapport);
    }

    async findAll(): Promise<Rapport[]> {
        return await this.rapportsRepository.find({
            where: { est_actif: true },
            order: { date: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Rapport> {
        const rapport = await this.rapportsRepository.findOne({
            where: { id, est_actif: true },
        });
        if (!rapport) {
            throw new NotFoundException(`Rapport #${id} non trouvé`);
        }
        return rapport;
    }

    async findByPisciculteur(userId: number): Promise<Rapport[]> {
        return await this.rapportsRepository.find({
            where: { pisciculteur: { id: userId }, est_actif: true },
            order: { date: 'DESC' },
        });
    }

    async remove(id: number): Promise<void> {
        const rapport = await this.findOne(id);
        rapport.est_actif = false;
        await this.rapportsRepository.save(rapport);
    }
} 