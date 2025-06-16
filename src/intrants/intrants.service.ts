import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intrant, IntrantStatus } from './entities/intrant.entity';
import { LivraisonIntrant, LivraisonStatus } from './entities/livraison-intrant.entity';
import { CreateIntrantDto } from './dto/create-intrant.dto';
import { UpdateIntrantDto } from './dto/update-intrant.dto';
import { CreateLivraisonDto } from './dto/create-livraison.dto';
import { UpdateLivraisonDto } from './dto/update-livraison.dto';

@Injectable()
export class IntrantsService {
  constructor(
    @InjectRepository(Intrant)
    private intrantsRepository: Repository<Intrant>,
    @InjectRepository(LivraisonIntrant)
    private livraisonsRepository: Repository<LivraisonIntrant>,
  ) {}

  // Gestion des intrants
  create(createIntrantDto: CreateIntrantDto) {
    const intrant = this.intrantsRepository.create(createIntrantDto);
    return this.intrantsRepository.save(intrant);
  }

  findAll() {
    return this.intrantsRepository.find();
  }

  async findOne(id: number) {
    const intrant = await this.intrantsRepository.findOne({ where: { id } });
    if (!intrant) {
      throw new NotFoundException(`Intrant #${id} non trouvé`);
    }
    return intrant;
  }

  async update(id: number, updateIntrantDto: UpdateIntrantDto) {
    const intrant = await this.findOne(id);
    Object.assign(intrant, updateIntrantDto);
    return this.intrantsRepository.save(intrant);
  }

  async remove(id: number) {
    const intrant = await this.findOne(id);
    return this.intrantsRepository.remove(intrant);
  }

  // Gestion des livraisons
  async createLivraison(createLivraisonDto: CreateLivraisonDto, adminId: number) {
    const intrant = await this.findOne(createLivraisonDto.intrant_id);

    if (intrant.statut !== IntrantStatus.DISPONIBLE) {
      throw new BadRequestException('Cet intrant n\'est pas disponible');
    }

    if (intrant.stock_disponible < createLivraisonDto.quantite) {
      throw new BadRequestException('Stock insuffisant');
    }

    const livraison = this.livraisonsRepository.create({
      ...createLivraisonDto,
      admin_id: adminId,
    });

    // Mettre à jour le stock
    intrant.stock_disponible -= createLivraisonDto.quantite;
    if (intrant.stock_disponible === 0) {
      intrant.statut = IntrantStatus.RUPTURE;
    }

    await this.intrantsRepository.save(intrant);
    return this.livraisonsRepository.save(livraison);
  }

  async findAllLivraisons() {
    return this.livraisonsRepository.find({
      relations: ['bassin', 'intrant', 'admin', 'pisciculteur'],
    });
  }

  async findOneLivraison(id: number) {
    const livraison = await this.livraisonsRepository.findOne({
      where: { id },
      relations: ['bassin', 'intrant', 'admin', 'pisciculteur'],
    });

    if (!livraison) {
      throw new NotFoundException('Livraison non trouvée');
    }

    return livraison;
  }

  async updateLivraison(id: number, updateLivraisonDto: UpdateLivraisonDto) {
    const livraison = await this.findOneLivraison(id);

    if (updateLivraisonDto.statut === LivraisonStatus.LIVREE && !updateLivraisonDto.date_livree) {
      updateLivraisonDto.date_livree = new Date();
    }

    Object.assign(livraison, updateLivraisonDto);
    return this.livraisonsRepository.save(livraison);
  }

  async getLivraisonsByBassin(bassinId: number) {
    return this.livraisonsRepository.find({
      where: { bassin_id: bassinId },
      relations: ['intrant', 'admin', 'pisciculteur'],
    });
  }

  async getMyLivraisons(pisciculteurId: number) {
    return this.livraisonsRepository.find({
      where: { pisciculteur_id: pisciculteurId },
      relations: ['bassin', 'intrant', 'admin'],
    });
  }
} 