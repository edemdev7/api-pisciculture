import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departement } from './departement.entity';

@Injectable()
export class DepartementsService {
  constructor(
    @InjectRepository(Departement)
    private departementRepository: Repository<Departement>,
  ) {}

  create(data: Partial<Departement>) {
    const departement = this.departementRepository.create(data);
    return this.departementRepository.save(departement);
  }

  findAll() {
    return this.departementRepository.find({ relations: ['regions'] });
  }

  findOne(id: number) {
    return this.departementRepository.findOne({ where: { id }, relations: ['regions'] });
  }

  async update(id: number, data: Partial<Departement>) {
    await this.departementRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.departementRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Département non trouvé');
    return { deleted: true };
  }
} 