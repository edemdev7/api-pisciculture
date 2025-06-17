import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Cout } from './entities/cout.entity';
import { CreateCoutDto } from './dto/create-cout.dto';
import { CategorieCout } from './entities/categorie-cout.entity';

@Injectable()
export class CoutsService {
    constructor(
        @InjectRepository(Cout)
        private coutsRepository: Repository<Cout>,
        @InjectRepository(CategorieCout)
        private categoriesRepository: Repository<CategorieCout>,
    ) {}

    async create(createCoutDto: CreateCoutDto): Promise<Cout> {
        const categorie = await this.categoriesRepository.findOne({
            where: { id: createCoutDto.categorie_id, est_actif: true },
        });
        if (!categorie) {
            throw new NotFoundException(`Catégorie #${createCoutDto.categorie_id} non trouvée`);
        }

        const cout = this.coutsRepository.create({
            ...createCoutDto,
            categorie,
        });

        return await this.coutsRepository.save(cout);
    }

    async findAll(): Promise<Cout[]> {
        return await this.coutsRepository.find({
            where: { est_actif: true },
            order: { date: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Cout> {
        const cout = await this.coutsRepository.findOne({
            where: { id, est_actif: true },
        });
        if (!cout) {
            throw new NotFoundException(`Coût #${id} non trouvé`);
        }
        return cout;
    }

    async findByCategorie(categorieId: number): Promise<Cout[]> {
        return await this.coutsRepository.find({
            where: { categorie: { id: categorieId }, est_actif: true },
            order: { date: 'DESC' },
        });
    }

    async findByDateRange(debut: Date, fin: Date): Promise<Cout[]> {
        return await this.coutsRepository.find({
            where: {
                date: Between(debut, fin),
                est_actif: true,
            },
            order: { date: 'DESC' },
        });
    }

    async getTotalByCategorie(categorieId: number): Promise<number> {
        const result = await this.coutsRepository
            .createQueryBuilder('cout')
            .select('SUM(cout.montant)', 'total')
            .where('cout.categorie_id = :categorieId', { categorieId })
            .andWhere('cout.est_actif = :estActif', { estActif: true })
            .getRawOne();

        return result?.total || 0;
    }

    async getTotalByDateRange(debut: Date, fin: Date): Promise<number> {
        const result = await this.coutsRepository
            .createQueryBuilder('cout')
            .select('SUM(cout.montant)', 'total')
            .where('cout.date BETWEEN :debut AND :fin', { debut, fin })
            .andWhere('cout.est_actif = :estActif', { estActif: true })
            .getRawOne();

        return result?.total || 0;
    }

    async remove(id: number): Promise<void> {
        const cout = await this.findOne(id);
        cout.est_actif = false;
        await this.coutsRepository.save(cout);
    }
} 