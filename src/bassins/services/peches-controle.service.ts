import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PecheControle } from '../entities/peche-controle.entity';
import { CreatePecheControleDto } from '../dto/create-peche-controle.dto';
import { Bassin } from '../entities/bassin.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class PechesControleService {
    constructor(
        @InjectRepository(PecheControle)
        private pecheControleRepository: Repository<PecheControle>,
        @InjectRepository(Bassin)
        private bassinRepository: Repository<Bassin>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(bassinId: number, pisciculteurId: number, createPecheDto: CreatePecheControleDto): Promise<PecheControle> {
        const bassin = await this.bassinRepository.findOne({ where: { id: bassinId } });
        if (!bassin) {
            throw new NotFoundException(`Bassin #${bassinId} non trouvé`);
        }

        const pisciculteur = await this.userRepository.findOne({ where: { id: pisciculteurId } });
        if (!pisciculteur) {
            throw new NotFoundException(`Pisciculteur #${pisciculteurId} non trouvé`);
        }

        const pecheControle = this.pecheControleRepository.create({
            ...createPecheDto,
            bassinId,
            pisciculteurId,
        });

        return await this.pecheControleRepository.save(pecheControle);
    }

    async findAllByBassin(bassinId: number): Promise<PecheControle[]> {
        return await this.pecheControleRepository.find({
            where: { bassinId },
            relations: ['bassin', 'pisciculteur'],
            order: { date_peche: 'DESC' },
        });
    }

    async findAllByPisciculteur(pisciculteurId: number): Promise<PecheControle[]> {
        return await this.pecheControleRepository.find({
            where: { pisciculteurId },
            relations: ['bassin', 'pisciculteur'],
            order: { date_peche: 'DESC' },
        });
    }

    async findOne(id: number): Promise<PecheControle> {
        const pecheControle = await this.pecheControleRepository.findOne({
            where: { id },
            relations: ['bassin', 'pisciculteur'],
        });

        if (!pecheControle) {
            throw new NotFoundException(`Pêche de contrôle #${id} non trouvée`);
        }

        return pecheControle;
    }

    async getStatistiquesPecheries(bassinId: number): Promise<any> {
        const peches = await this.pecheControleRepository.find({
            where: { bassinId },
            order: { date_peche: 'DESC' },
        });

        if (peches.length === 0) {
            return {
                nombre_peches: 0,
                poids_total_peche: 0,
                poids_moyen_par_peche: 0,
                evolution_poids: [],
            };
        }

        const poidsTotal = peches.reduce((sum, p) => sum + p.poids_total_peche, 0);
        const poidsMoyenParPeche = poidsTotal / peches.length;

        const evolutionPoids = peches.map(p => ({
            date: p.date_peche,
            poids_moyen_poisson: p.poids_moyen_poisson,
            nombre_poissons: p.nombre_poissons_peches,
        }));

        return {
            nombre_peches: peches.length,
            poids_total_peche: poidsTotal,
            poids_moyen_par_peche: poidsMoyenParPeche,
            evolution_poids: evolutionPoids,
        };
    }
} 