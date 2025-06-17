import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maintenance } from './entities/maintenance.entity';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { Equipement } from './entities/equipement.entity';
import { StatutEquipement } from './entities/equipement.entity';
import { Between } from 'typeorm';

@Injectable()
export class MaintenancesService {
    constructor(
        @InjectRepository(Maintenance)
        private maintenancesRepository: Repository<Maintenance>,
        @InjectRepository(Equipement)
        private equipementsRepository: Repository<Equipement>,
    ) {}

    async create(createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance> {
        const equipement = await this.equipementsRepository.findOne({
            where: { id: createMaintenanceDto.equipement_id, est_actif: true },
        });
        if (!equipement) {
            throw new NotFoundException(`Équipement #${createMaintenanceDto.equipement_id} non trouvé`);
        }

        const maintenance = this.maintenancesRepository.create({
            ...createMaintenanceDto,
            equipement,
        });

        // Mettre à jour la date de maintenance de l'équipement
        equipement.date_maintenance = createMaintenanceDto.date;
        equipement.statut = StatutEquipement.ACTIF;
        await this.equipementsRepository.save(equipement);

        return await this.maintenancesRepository.save(maintenance);
    }

    async findAll(): Promise<Maintenance[]> {
        return await this.maintenancesRepository.find({
            where: { est_actif: true },
            order: { date: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Maintenance> {
        const maintenance = await this.maintenancesRepository.findOne({
            where: { id, est_actif: true },
        });
        if (!maintenance) {
            throw new NotFoundException(`Maintenance #${id} non trouvée`);
        }
        return maintenance;
    }

    async findByEquipement(equipementId: number): Promise<Maintenance[]> {
        return await this.maintenancesRepository.find({
            where: { equipement: { id: equipementId }, est_actif: true },
            order: { date: 'DESC' },
        });
    }

    async findByDateRange(debut: Date, fin: Date): Promise<Maintenance[]> {
        return await this.maintenancesRepository.find({
            where: {
                date: Between(debut, fin),
                est_actif: true,
            },
            order: { date: 'DESC' },
        });
    }

    async remove(id: number): Promise<void> {
        const maintenance = await this.findOne(id);
        maintenance.est_actif = false;
        await this.maintenancesRepository.save(maintenance);
    }
} 