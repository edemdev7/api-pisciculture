import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aliment } from './entities/aliment.entity';
import { StockAliment } from './entities/stock-aliment.entity';
import { MouvementStockAliment } from './entities/mouvement-stock-aliment.entity';
import { DistributionAliment } from './entities/distribution-aliment.entity';
import { CreateAlimentDto } from './dto/create-aliment.dto';
import { UpdateAlimentDto } from './dto/update-aliment.dto';
import { CreateStockAlimentDto } from './dto/create-stock-aliment.dto';
import { UpdateStockAlimentDto } from './dto/update-stock-aliment.dto';
import { CreateMouvementStockAlimentDto } from './dto/create-mouvement-stock-aliment.dto';
import { CreateDistributionAlimentDto } from './dto/create-distribution-aliment.dto';
import { UpdateDistributionAlimentDto } from './dto/update-distribution-aliment.dto';
import { TypeMouvement } from './entities/mouvement-stock-aliment.entity';
import { StatutDistribution } from './entities/distribution-aliment.entity';
import { Bassin } from '../bassins/entities/bassin.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AlimentsService {
    constructor(
        @InjectRepository(Aliment)
        private alimentRepository: Repository<Aliment>,
        @InjectRepository(StockAliment)
        private stockAlimentRepository: Repository<StockAliment>,
        @InjectRepository(MouvementStockAliment)
        private mouvementStockAlimentRepository: Repository<MouvementStockAliment>,
        @InjectRepository(DistributionAliment)
        private distributionAlimentRepository: Repository<DistributionAliment>,
        @InjectRepository(Bassin)
        private bassinRepository: Repository<Bassin>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    // Gestion des aliments
    async create(createAlimentDto: CreateAlimentDto): Promise<Aliment> {
        const aliment = this.alimentRepository.create(createAlimentDto);
        return await this.alimentRepository.save(aliment);
    }

    async findAll(): Promise<Aliment[]> {
        return await this.alimentRepository.find({
            relations: ['stocks', 'distributions'],
        });
    }

    async findOne(id: number): Promise<Aliment> {
        const aliment = await this.alimentRepository.findOne({
            where: { id },
            relations: ['stocks', 'distributions'],
        });
        if (!aliment) {
            throw new NotFoundException(`Aliment avec l'ID ${id} non trouvé`);
        }
        return aliment;
    }

    async update(id: number, updateAlimentDto: UpdateAlimentDto): Promise<Aliment> {
        const aliment = await this.findOne(id);
        Object.assign(aliment, updateAlimentDto);
        return await this.alimentRepository.save(aliment);
    }

    async remove(id: number): Promise<void> {
        const aliment = await this.findOne(id);
        await this.alimentRepository.remove(aliment);
    }

    // Gestion des stocks d'aliments
    async createStock(createStockAlimentDto: CreateStockAlimentDto): Promise<StockAliment> {
        const aliment = await this.alimentRepository.findOne({
            where: { id: createStockAlimentDto.aliment_id },
        });
        if (!aliment) {
            throw new NotFoundException(`Aliment avec l'ID ${createStockAlimentDto.aliment_id} non trouvé`);
        }

        const stock = this.stockAlimentRepository.create({
            ...createStockAlimentDto,
            aliment,
        });
        return await this.stockAlimentRepository.save(stock);
    }

    async findAllStocks(): Promise<StockAliment[]> {
        return await this.stockAlimentRepository.find({
            relations: ['aliment', 'mouvements'],
        });
    }

    async findOneStock(id: number): Promise<StockAliment> {
        const stock = await this.stockAlimentRepository.findOne({
            where: { id },
            relations: ['aliment', 'mouvements'],
        });
        if (!stock) {
            throw new NotFoundException(`Stock avec l'ID ${id} non trouvé`);
        }
        return stock;
    }

    async updateStock(id: number, updateStockAlimentDto: UpdateStockAlimentDto): Promise<StockAliment> {
        const stock = await this.findOneStock(id);
        Object.assign(stock, updateStockAlimentDto);
        return await this.stockAlimentRepository.save(stock);
    }

    async removeStock(id: number): Promise<void> {
        const stock = await this.findOneStock(id);
        await this.stockAlimentRepository.remove(stock);
    }

    // Gestion des mouvements de stock
    async createMouvementStock(stockId: number, type: TypeMouvement, quantite: number, commentaire?: string) {
        const stock = await this.stockAlimentRepository.findOne({ where: { id: stockId } });
        if (!stock) {
            throw new NotFoundException(`Stock #${stockId} non trouvé`);
        }

        const mouvement = this.mouvementStockAlimentRepository.create({
            stock_aliment: stock,
            type,
            quantite,
            commentaire,
            pisciculteur: stock.pisciculteur
        });

        return await this.mouvementStockAlimentRepository.save(mouvement);
    }

    async getMouvementsStock(stockId: number) {
        return await this.mouvementStockAlimentRepository.find({
            where: { stock_aliment: { id: stockId } },
            relations: ['stock_aliment', 'pisciculteur'],
            order: { created_at: 'DESC' }
        });
    }

    async findAllMouvements(): Promise<MouvementStockAliment[]> {
        return this.mouvementStockAlimentRepository.find({
            relations: ['stock_aliment', 'stock_aliment.aliment', 'pisciculteur']
        });
    }

    async findOneMouvement(id: number): Promise<MouvementStockAliment> {
        const mouvement = await this.mouvementStockAlimentRepository.findOne({
            where: { id },
            relations: ['stock_aliment', 'stock_aliment.aliment', 'pisciculteur']
        });
        if (!mouvement) {
            throw new NotFoundException(`Mouvement avec l'ID ${id} non trouvé`);
        }
        return mouvement;
    }

    // Gestion des distributions
    async createDistribution(createDistributionDto: CreateDistributionAlimentDto, pisciculteurId: number): Promise<DistributionAliment> {
        const { aliment_id, bassin_id, quantite, date_prevue, date_distribution, statut, commentaire } = createDistributionDto;

        // Vérifier si l'aliment existe
        const aliment = await this.alimentRepository.findOne({ where: { id: aliment_id } });
        if (!aliment) {
            throw new NotFoundException(`Aliment avec l'ID ${aliment_id} non trouvé`);
        }

        // Vérifier si le bassin existe
        const bassin = await this.bassinRepository.findOne({ where: { id: bassin_id } });
        if (!bassin) {
            throw new NotFoundException(`Bassin avec l'ID ${bassin_id} non trouvé`);
        }

        // Vérifier si le pisciculteur existe
        const pisciculteur = await this.userRepository.findOne({ where: { id: pisciculteurId } });
        if (!pisciculteur) {
            throw new NotFoundException(`Pisciculteur avec l'ID ${pisciculteurId} non trouvé`);
        }

        // Vérifier si le stock est suffisant
        const stock = await this.stockAlimentRepository.findOne({
            where: { aliment: { id: aliment_id } }
        });
        if (!stock || stock.quantite < quantite) {
            throw new BadRequestException('Quantité insuffisante en stock');
        }

        // Créer la distribution
        const distribution = this.distributionAlimentRepository.create({
            aliment,
            bassin,
            quantite,
            date_prevue,
            date_distribution,
            statut: statut || StatutDistribution.PLANIFIEE,
            commentaire,
            pisciculteur
        });

        // Mettre à jour le stock
        stock.quantite -= quantite;
        await this.stockAlimentRepository.save(stock);

        return this.distributionAlimentRepository.save(distribution);
    }

    async findAllDistributions(): Promise<DistributionAliment[]> {
        return await this.distributionAlimentRepository.find({
            relations: ['aliment', 'bassin', 'pisciculteur'],
        });
    }

    async findOneDistribution(id: number): Promise<DistributionAliment> {
        const distribution = await this.distributionAlimentRepository.findOne({
            where: { id },
            relations: ['aliment', 'bassin', 'pisciculteur'],
        });
        if (!distribution) {
            throw new NotFoundException(`Distribution avec l'ID ${id} non trouvée`);
        }
        return distribution;
    }

    async updateDistribution(id: number, updateDistributionDto: UpdateDistributionAlimentDto): Promise<DistributionAliment> {
        const distribution = await this.distributionAlimentRepository.findOne({
            where: { id },
            relations: ['aliment', 'bassin', 'pisciculteur']
        });
        if (!distribution) {
            throw new NotFoundException(`Distribution avec l'ID ${id} non trouvée`);
        }

        // Si la quantité est modifiée, mettre à jour le stock
        if (updateDistributionDto.quantite && updateDistributionDto.quantite !== distribution.quantite) {
            const stock = await this.stockAlimentRepository.findOne({
                where: { aliment: { id: distribution.aliment.id } }
            });
            if (!stock) {
                throw new NotFoundException('Stock non trouvé pour cet aliment');
            }

            // Remettre l'ancienne quantité en stock
            stock.quantite += distribution.quantite;
            // Soustraire la nouvelle quantité
            stock.quantite -= updateDistributionDto.quantite;
            await this.stockAlimentRepository.save(stock);
        }

        // Mettre à jour la distribution
        Object.assign(distribution, updateDistributionDto);
        return this.distributionAlimentRepository.save(distribution);
    }

    async getDistributionsByBassin(bassinId: number): Promise<DistributionAliment[]> {
        return await this.distributionAlimentRepository.find({
            where: { bassin: { id: bassinId } },
            relations: ['aliment', 'pisciculteur'],
        });
    }

    async getMyDistributions(pisciculteurId: number): Promise<DistributionAliment[]> {
        return await this.distributionAlimentRepository.find({
            where: { pisciculteur: { id: pisciculteurId } },
            relations: ['aliment', 'bassin'],
        });
    }

    async removeDistribution(id: number): Promise<void> {
        const distribution = await this.distributionAlimentRepository.findOne({
            where: { id },
            relations: ['aliment']
        });
        if (!distribution) {
            throw new NotFoundException(`Distribution avec l'ID ${id} non trouvée`);
        }

        // Si la distribution n'est pas terminée, remettre la quantité en stock
        if (distribution.statut !== StatutDistribution.TERMINEE) {
            const stock = await this.stockAlimentRepository.findOne({
                where: { aliment: { id: distribution.aliment.id } }
            });
            if (stock) {
                stock.quantite += distribution.quantite;
                await this.stockAlimentRepository.save(stock);
            }
        }

        await this.distributionAlimentRepository.remove(distribution);
    }
} 