import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParametreEau } from './entities/parametre-eau.entity';
import { CreateParametreEauDto } from './dto/create-parametre-eau.dto';

@Injectable()
export class ParametresEauService {
    constructor(
        @InjectRepository(ParametreEau)
        private parametresRepository: Repository<ParametreEau>,
    ) {}

    async create(createParametreEauDto: CreateParametreEauDto): Promise<ParametreEau> {
        const parametre = this.parametresRepository.create(createParametreEauDto);
        return await this.parametresRepository.save(parametre);
    }

    async findAll(): Promise<ParametreEau[]> {
        return await this.parametresRepository.find({
            where: { est_actif: true },
            order: { nom: 'ASC' },
        });
    }

    async findOne(id: number): Promise<ParametreEau> {
        const parametre = await this.parametresRepository.findOne({
            where: { id, est_actif: true },
        });
        if (!parametre) {
            throw new NotFoundException(`Paramètre #${id} non trouvé`);
        }
        return parametre;
    }

    async update(id: number, updateParametreEauDto: CreateParametreEauDto): Promise<ParametreEau> {
        const parametre = await this.findOne(id);
        Object.assign(parametre, updateParametreEauDto);
        return await this.parametresRepository.save(parametre);
    }

    async remove(id: number): Promise<void> {
        const parametre = await this.findOne(id);
        parametre.est_actif = false;
        await this.parametresRepository.save(parametre);
    }
} 