import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformanceBassin } from '../entities/performance-bassin.entity';
import { CreatePerformanceBassinDto } from '../dto/create-performance-bassin.dto';
import { Bassin } from '../entities/bassin.entity';

@Injectable()
export class PerformancesService {
    constructor(
        @InjectRepository(PerformanceBassin)
        private performanceRepository: Repository<PerformanceBassin>,
        @InjectRepository(Bassin)
        private bassinRepository: Repository<Bassin>,
    ) {}

    async create(bassinId: number, createPerformanceDto: CreatePerformanceBassinDto): Promise<PerformanceBassin> {
        const bassin = await this.bassinRepository.findOne({ where: { id: bassinId } });
        if (!bassin) {
            throw new NotFoundException(`Bassin #${bassinId} non trouvé`);
        }

        const performance = this.performanceRepository.create({
            ...createPerformanceDto,
            bassinId,
        });

        return await this.performanceRepository.save(performance);
    }

    async findAllByBassin(bassinId: number): Promise<PerformanceBassin[]> {
        return await this.performanceRepository.find({
            where: { bassinId },
            relations: ['bassin'],
            order: { date_mesure: 'DESC' },
        });
    }

    async findOne(id: number): Promise<PerformanceBassin> {
        const performance = await this.performanceRepository.findOne({
            where: { id },
            relations: ['bassin'],
        });

        if (!performance) {
            throw new NotFoundException(`Performance #${id} non trouvée`);
        }

        return performance;
    }

    async getStatistiquesBassin(bassinId: number): Promise<any> {
        const performances = await this.performanceRepository.find({
            where: { bassinId },
            order: { date_mesure: 'DESC' },
        });

        if (performances.length === 0) {
            return {
                nombre_mesures: 0,
                moyenne_taux_croissance: 0,
                moyenne_taux_mortalite: 0,
                evolution_poids: [],
            };
        }

        const moyenneTauxCroissance = performances.reduce((sum, p) => sum + p.taux_croissance, 0) / performances.length;
        const moyenneTauxMortalite = performances.reduce((sum, p) => sum + p.taux_mortalite, 0) / performances.length;

        const evolutionPoids = performances.map(p => ({
            date: p.date_mesure,
            poids_moyen: p.poids_moyen,
            nombre_poissons: p.nombre_poissons,
        }));

        return {
            nombre_mesures: performances.length,
            moyenne_taux_croissance: moyenneTauxCroissance,
            moyenne_taux_mortalite: moyenneTauxMortalite,
            evolution_poids: evolutionPoids,
        };
    }
} 