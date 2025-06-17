import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipement, TypeEquipement, StatutEquipement } from './entities/equipement.entity';
import { CreateEquipementDto } from './dto/create-equipement.dto';

@Injectable()
export class EquipementsService {
    constructor(
        @InjectRepository(Equipement)
        private equipementsRepository: Repository<Equipement>,
    ) {}

    async create(createEquipementDto: CreateEquipementDto): Promise<Equipement> {
        const equipement = this.equipementsRepository.create(createEquipementDto);
        return await this.equipementsRepository.save(equipement);
    }

    async findAll(): Promise<Equipement[]> {
        return await this.equipementsRepository.find({
            where: { est_actif: true },
            order: { nom: 'ASC' },
        });
    }

    async findOne(id: number): Promise<Equipement> {
        const equipement = await this.equipementsRepository.findOne({
            where: { id, est_actif: true },
            relations: ['maintenances'],
        });
        if (!equipement) {
            throw new NotFoundException(`Équipement #${id} non trouvé`);
        }
        return equipement;
    }

    async update(id: number, updateEquipementDto: CreateEquipementDto): Promise<Equipement> {
        const equipement = await this.findOne(id);
        Object.assign(equipement, updateEquipementDto);
        return await this.equipementsRepository.save(equipement);
    }

    async updateStatut(id: number, statut: StatutEquipement): Promise<Equipement> {
        const equipement = await this.findOne(id);
        equipement.statut = statut;
        return await this.equipementsRepository.save(equipement);
    }

    async remove(id: number): Promise<void> {
        const equipement = await this.findOne(id);
        equipement.est_actif = false;
        await this.equipementsRepository.save(equipement);
    }

    async findByType(type: TypeEquipement): Promise<Equipement[]> {
        return await this.equipementsRepository.find({
            where: { type, est_actif: true },
            order: { nom: 'ASC' },
        });
    }

    async findByStatut(statut: StatutEquipement): Promise<Equipement[]> {
        return await this.equipementsRepository.find({
            where: { statut, est_actif: true },
            order: { nom: 'ASC' },
        });
    }
} 