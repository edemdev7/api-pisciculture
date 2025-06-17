import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MesureEau } from './entities/mesure-eau.entity';
import { CreateMesureEauDto } from './dto/create-mesure-eau.dto';
import { Bassin } from '../bassins/entities/bassin.entity';
import { ParametreEau } from './entities/parametre-eau.entity';
import { Between } from 'typeorm';

@Injectable()
export class MesuresEauService {
    constructor(
        @InjectRepository(MesureEau)
        private mesuresRepository: Repository<MesureEau>,
        @InjectRepository(Bassin)
        private bassinsRepository: Repository<Bassin>,
        @InjectRepository(ParametreEau)
        private parametresRepository: Repository<ParametreEau>,
    ) {}

    async create(createMesureEauDto: CreateMesureEauDto): Promise<MesureEau> {
        const bassin = await this.bassinsRepository.findOne({
            where: { id: createMesureEauDto.bassin_id, est_actif: true },
        });
        if (!bassin) {
            throw new NotFoundException(`Bassin #${createMesureEauDto.bassin_id} non trouvé`);
        }

        const parametre = await this.parametresRepository.findOne({
            where: { id: createMesureEauDto.parametre_id, est_actif: true },
        });
        if (!parametre) {
            throw new NotFoundException(`Paramètre #${createMesureEauDto.parametre_id} non trouvé`);
        }

        const mesure = this.mesuresRepository.create({
            ...createMesureEauDto,
            bassin,
            parametre,
        });

        // Vérifier si la valeur est dans les limites acceptables
        if (mesure.valeur < parametre.valeur_minimale || mesure.valeur > parametre.valeur_maximale) {
            // TODO: Créer une alerte pour les valeurs hors limites
        }

        return await this.mesuresRepository.save(mesure);
    }

    async findAll(): Promise<MesureEau[]> {
        return await this.mesuresRepository.find({
            where: { est_actif: true },
            order: { date_mesure: 'DESC' },
        });
    }

    async findOne(id: number): Promise<MesureEau> {
        const mesure = await this.mesuresRepository.findOne({
            where: { id, est_actif: true },
        });
        if (!mesure) {
            throw new NotFoundException(`Mesure #${id} non trouvée`);
        }
        return mesure;
    }

    async findByBassin(bassinId: number): Promise<MesureEau[]> {
        return await this.mesuresRepository.find({
            where: { bassin: { id: bassinId }, est_actif: true },
            order: { date_mesure: 'DESC' },
        });
    }

    async findByParametre(parametreId: number): Promise<MesureEau[]> {
        return await this.mesuresRepository.find({
            where: { parametre: { id: parametreId }, est_actif: true },
            order: { date_mesure: 'DESC' },
        });
    }

    async findByDateRange(debut: Date, fin: Date): Promise<MesureEau[]> {
        return await this.mesuresRepository.find({
            where: {
                date_mesure: Between(debut, fin),
                est_actif: true,
            },
            order: { date_mesure: 'DESC' },
        });
    }

    async remove(id: number): Promise<void> {
        const mesure = await this.findOne(id);
        mesure.est_actif = false;
        await this.mesuresRepository.save(mesure);
    }
} 