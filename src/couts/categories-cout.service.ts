import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategorieCout } from './entities/categorie-cout.entity';
import { CreateCategorieCoutDto } from './dto/create-categorie-cout.dto';

@Injectable()
export class CategoriesCoutService {
    constructor(
        @InjectRepository(CategorieCout)
        private categoriesRepository: Repository<CategorieCout>,
    ) {}

    async create(createCategorieCoutDto: CreateCategorieCoutDto): Promise<CategorieCout> {
        const categorie = this.categoriesRepository.create(createCategorieCoutDto);
        return await this.categoriesRepository.save(categorie);
    }

    async findAll(): Promise<CategorieCout[]> {
        return await this.categoriesRepository.find({
            where: { est_actif: true },
            order: { nom: 'ASC' },
        });
    }

    async findOne(id: number): Promise<CategorieCout> {
        const categorie = await this.categoriesRepository.findOne({
            where: { id, est_actif: true },
            relations: ['couts'],
        });
        if (!categorie) {
            throw new NotFoundException(`Catégorie #${id} non trouvée`);
        }
        return categorie;
    }

    async update(id: number, updateCategorieCoutDto: CreateCategorieCoutDto): Promise<CategorieCout> {
        const categorie = await this.findOne(id);
        Object.assign(categorie, updateCategorieCoutDto);
        return await this.categoriesRepository.save(categorie);
    }

    async remove(id: number): Promise<void> {
        const categorie = await this.findOne(id);
        categorie.est_actif = false;
        await this.categoriesRepository.save(categorie);
    }
} 