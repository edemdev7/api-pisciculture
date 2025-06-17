import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { RapportFinancier, TypeRapportFinancier } from './entities/rapport-financier.entity';
import { CreateRapportFinancierDto } from './dto/create-rapport-financier.dto';

@Injectable()
export class RapportsFinanciersService {
    constructor(
        @InjectRepository(RapportFinancier)
        private rapportFinancierRepository: Repository<RapportFinancier>,
    ) {}

    async create(createRapportFinancierDto: CreateRapportFinancierDto): Promise<RapportFinancier> {
        const rapport = this.rapportFinancierRepository.create(createRapportFinancierDto);
        return this.rapportFinancierRepository.save(rapport);
    }

    async findAll(): Promise<RapportFinancier[]> {
        return this.rapportFinancierRepository.find({
            order: {
                dateDebut: 'DESC',
            },
        });
    }

    async findOne(id: number): Promise<RapportFinancier> {
        const rapport = await this.rapportFinancierRepository.findOne({ where: { id } });
        if (!rapport) {
            throw new NotFoundException(`Rapport financier #${id} non trouvé`);
        }
        return rapport;
    }

    async findByType(type: TypeRapportFinancier): Promise<RapportFinancier[]> {
        return this.rapportFinancierRepository.find({
            where: { type },
            order: {
                dateDebut: 'DESC',
            },
        });
    }

    async findByDateRange(debut: Date, fin: Date): Promise<RapportFinancier[]> {
        return this.rapportFinancierRepository.find({
            where: {
                dateDebut: Between(debut, fin),
            },
            order: {
                dateDebut: 'DESC',
            },
        });
    }

    async getTotalRevenus(debut: Date, fin: Date): Promise<number> {
        const result = await this.rapportFinancierRepository
            .createQueryBuilder('rapport')
            .select('SUM(rapport.revenus)', 'total')
            .where('rapport.dateDebut BETWEEN :debut AND :fin', { debut, fin })
            .getRawOne();
        return result?.total || 0;
    }

    async getTotalDepenses(debut: Date, fin: Date): Promise<number> {
        const result = await this.rapportFinancierRepository
            .createQueryBuilder('rapport')
            .select('SUM(rapport.depenses)', 'total')
            .where('rapport.dateDebut BETWEEN :debut AND :fin', { debut, fin })
            .getRawOne();
        return result?.total || 0;
    }

    async getTotalBenefice(debut: Date, fin: Date): Promise<number> {
        const result = await this.rapportFinancierRepository
            .createQueryBuilder('rapport')
            .select('SUM(rapport.benefice)', 'total')
            .where('rapport.dateDebut BETWEEN :debut AND :fin', { debut, fin })
            .getRawOne();
        return result?.total || 0;
    }

    async remove(id: number): Promise<void> {
        const rapport = await this.findOne(id);
        await this.rapportFinancierRepository.remove(rapport);
    }
} 