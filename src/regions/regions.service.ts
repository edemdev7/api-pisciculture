import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './region.entity';
import { Departement } from '../departements/departement.entity';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
    @InjectRepository(Departement)
    private departementRepository: Repository<Departement>,
  ) {}

  async create(data: { nom: string; departementId: number }) {
    const departement = await this.departementRepository.findOne({ where: { id: data.departementId } });
    if (!departement) throw new NotFoundException('Département non trouvé');
    const region = this.regionRepository.create({ nom: data.nom, departement });
    return this.regionRepository.save(region);
  }

  findAll() {
    return this.regionRepository.find({ relations: ['departement'] });
  }

  findOne(id: number) {
    return this.regionRepository.findOne({ where: { id }, relations: ['departement'] });
  }

  async update(id: number, data: { nom?: string; departementId?: number }) {
    const region = await this.regionRepository.findOne({ where: { id } });
    if (!region) throw new NotFoundException('Région non trouvée');
    if (data.departementId) {
      const departement = await this.departementRepository.findOne({ where: { id: data.departementId } });
      if (!departement) throw new NotFoundException('Département non trouvé');
      region.departement = departement;
    }
    if (data.nom) region.nom = data.nom;
    return this.regionRepository.save(region);
  }

  async remove(id: number) {
    const result = await this.regionRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Région non trouvée');
    return { deleted: true };
  }

  async findByDepartement(departementId: number) {
    return this.regionRepository.find({ where: { departement: { id: departementId } }, relations: ['departement'] });
  }
} 