import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recolte } from './entities/recolte.entity';
import { Vente } from './entities/vente.entity';
import { CreateRecolteDto } from './dto/create-recolte.dto';
import { UpdateRecolteDto } from './dto/update-recolte.dto';
import { CreateVenteDto } from './dto/create-vente.dto';
import { UpdateVenteDto } from './dto/update-vente.dto';

@Injectable()
export class RecoltesService {
    constructor(
        @InjectRepository(Recolte)
        private recolteRepository: Repository<Recolte>,
        @InjectRepository(Vente)
        private venteRepository: Repository<Vente>,
    ) {}

    // Méthodes pour les récoltes
    async create(createRecolteDto: CreateRecolteDto): Promise<Recolte> {
        const recolte = this.recolteRepository.create(createRecolteDto);
        return await this.recolteRepository.save(recolte);
    }

    async findAll(): Promise<Recolte[]> {
        return await this.recolteRepository.find({
            relations: ['bassin', 'pisciculteur', 'ventes'],
        });
    }

    async findOne(id: number): Promise<Recolte> {
        const recolte = await this.recolteRepository.findOne({
            where: { id },
            relations: ['bassin', 'pisciculteur', 'ventes'],
        });

        if (!recolte) {
            throw new NotFoundException(`Récolte avec l'ID ${id} non trouvée`);
        }

        return recolte;
    }

    async update(id: number, updateRecolteDto: UpdateRecolteDto): Promise<Recolte> {
        const recolte = await this.findOne(id);
        Object.assign(recolte, updateRecolteDto);
        return await this.recolteRepository.save(recolte);
    }

    async remove(id: number): Promise<void> {
        const recolte = await this.findOne(id);
        await this.recolteRepository.remove(recolte);
    }

    // Méthodes pour les ventes
    async createVente(createVenteDto: CreateVenteDto): Promise<Vente> {
        // Vérifier si la récolte existe et si la quantité est disponible
        const recolte = await this.findOne(createVenteDto.recolte_id);
        
        // Calculer la quantité totale déjà vendue
        const quantiteVendue = recolte.ventes.reduce((total, vente) => total + vente.quantite, 0);
        const quantiteDisponible = recolte.quantite - quantiteVendue;

        if (createVenteDto.quantite > quantiteDisponible) {
            throw new BadRequestException('Quantité insuffisante disponible pour cette vente');
        }

        const vente = this.venteRepository.create(createVenteDto);
        return await this.venteRepository.save(vente);
    }

    async findAllVentes(): Promise<Vente[]> {
        return await this.venteRepository.find({
            relations: ['recolte', 'pisciculteur'],
        });
    }

    async findOneVente(id: number): Promise<Vente> {
        const vente = await this.venteRepository.findOne({
            where: { id },
            relations: ['recolte', 'pisciculteur'],
        });

        if (!vente) {
            throw new NotFoundException(`Vente avec l'ID ${id} non trouvée`);
        }

        return vente;
    }

    async updateVente(id: number, updateVenteDto: UpdateVenteDto): Promise<Vente> {
        const vente = await this.findOneVente(id);

        // Si la quantité est modifiée, vérifier la disponibilité
        if (updateVenteDto.quantite && updateVenteDto.quantite !== vente.quantite) {
            const recolte = await this.findOne(vente.recolte_id);
            const quantiteVendue = recolte.ventes.reduce((total, v) => {
                if (v.id !== id) return total + v.quantite;
                return total;
            }, 0);
            const quantiteDisponible = recolte.quantite - quantiteVendue;

            if (updateVenteDto.quantite > quantiteDisponible) {
                throw new BadRequestException('Quantité insuffisante disponible pour cette vente');
            }
        }

        Object.assign(vente, updateVenteDto);
        return await this.venteRepository.save(vente);
    }

    async removeVente(id: number): Promise<void> {
        const vente = await this.findOneVente(id);
        await this.venteRepository.remove(vente);
    }

    // Méthodes de statistiques
    async getStatistiquesRecoltes(): Promise<any> {
        const recoltes = await this.recolteRepository.find({
            relations: ['ventes'],
        });

        const totalRecolte = recoltes.reduce((total, recolte) => total + recolte.quantite, 0);
        const totalVente = recoltes.reduce((total, recolte) => {
            return total + recolte.ventes.reduce((venteTotal, vente) => venteTotal + vente.quantite, 0);
        }, 0);

        return {
            totalRecolte,
            totalVente,
            resteAVendre: totalRecolte - totalVente,
            nombreRecoltes: recoltes.length,
        };
    }
} 