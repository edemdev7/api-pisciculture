import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvenementCalendrier } from './entities/evenement-calendrier.entity';

@Injectable()
export class CalendrierService {
  constructor(
    @InjectRepository(EvenementCalendrier)
    private evenementRepo: Repository<EvenementCalendrier>,
  ) {}

  create(data: Partial<EvenementCalendrier>) {
    return this.evenementRepo.save(data);
  }
  findAll() {
    return this.evenementRepo.find({ relations: ['pisciculteur'] });
  }
  findOne(id: number) {
    return this.evenementRepo.findOne({ where: { id }, relations: ['pisciculteur'] });
  }
  update(id: number, data: Partial<EvenementCalendrier>) {
    return this.evenementRepo.update(id, data);
  }
  remove(id: number) {
    return this.evenementRepo.delete(id);
  }
  findByPisciculteur(pisciculteur_id: number) {
    return this.evenementRepo.find({ where: { pisciculteur_id }, relations: ['pisciculteur'] });
  }
} 