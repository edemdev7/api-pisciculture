import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, Raw } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { MouvementStock, TypeMouvement } from './entities/mouvement-stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { CreateMouvementDto } from './dto/create-mouvement.dto';
import { Intrant } from '../intrants/entities/intrant.entity';
import { StockStatut } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    @InjectRepository(MouvementStock)
    private mouvementRepository: Repository<MouvementStock>,
    @InjectRepository(Intrant)
    private intrantRepository: Repository<Intrant>,
  ) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    const intrant = await this.intrantRepository.findOne({
      where: { id: createStockDto.intrant_id }
    });

    if (!intrant) {
      throw new NotFoundException(`Intrant avec l'ID ${createStockDto.intrant_id} non trouvé`);
    }

    const stock = this.stockRepository.create({
      ...createStockDto,
      intrant
    });

    return await this.stockRepository.save(stock);
  }

  async findAll(): Promise<Stock[]> {
    return await this.stockRepository.find({
      relations: ['intrant', 'mouvements']
    });
  }

  async findOne(id: number): Promise<Stock> {
    const stock = await this.stockRepository.findOne({
      where: { id },
      relations: ['intrant', 'mouvements']
    });

    if (!stock) {
      throw new NotFoundException(`Stock avec l'ID ${id} non trouvé`);
    }

    return stock;
  }

  async update(id: number, updateStockDto: UpdateStockDto): Promise<Stock> {
    const stock = await this.findOne(id);
    Object.assign(stock, updateStockDto);
    return await this.stockRepository.save(stock);
  }

  async remove(id: number): Promise<void> {
    const stock = await this.findOne(id);
    await this.stockRepository.remove(stock);
  }

  async createMouvement(createMouvementDto: CreateMouvementDto, userId: number): Promise<MouvementStock> {
    const stock = await this.findOne(createMouvementDto.stock_id);
    
    const mouvement = this.mouvementRepository.create({
      ...createMouvementDto,
      stock,
      utilisateur: { id: userId }
    });

    // Mise à jour de la quantité du stock
    if (createMouvementDto.type === TypeMouvement.ENTREE) {
      stock.quantite += createMouvementDto.quantite;
    } else if (createMouvementDto.type === TypeMouvement.SORTIE) {
      if (stock.quantite < createMouvementDto.quantite) {
        throw new BadRequestException('Quantité insuffisante en stock');
      }
      stock.quantite -= createMouvementDto.quantite;
    } else if (createMouvementDto.type === TypeMouvement.AJUSTEMENT) {
      stock.quantite = createMouvementDto.quantite;
    }

    await this.stockRepository.save(stock);
    return await this.mouvementRepository.save(mouvement);
  }

  async getMouvements(stockId: number): Promise<MouvementStock[]> {
    return await this.mouvementRepository.find({
      where: { stock: { id: stockId } },
      relations: ['utilisateur'],
      order: { created_at: 'DESC' }
    });
  }

  private updateStockStatus(stock: Stock): void {
    if (stock.quantite <= 0) {
      stock.statut = StockStatut.EPUISE;
    } else if (stock.date_expiration && new Date(stock.date_expiration) < new Date()) {
      stock.statut = StockStatut.PERIME;
    } else {
      stock.statut = StockStatut.EN_STOCK;
    }
  }

  async getStocksAlertes(): Promise<Stock[]> {
    return await this.stockRepository.find({
      where: [
        { quantite: LessThanOrEqual(0) },
        { quantite: Raw(alias => `${alias} <= seuil_alerte`) }
      ],
      relations: ['intrant']
    });
  }
} 