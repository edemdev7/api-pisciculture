import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvanceIntrant, AvanceStatut } from './entities/avance-intrant.entity';
import { Remboursement } from './entities/remboursement.entity';
import { Dette, DetteStatut } from './entities/dette.entity';

@Injectable()
export class AvancesIntrantsService {
  constructor(
    @InjectRepository(AvanceIntrant)
    private avanceRepo: Repository<AvanceIntrant>,
    @InjectRepository(Remboursement)
    private remboursementRepo: Repository<Remboursement>,
    @InjectRepository(Dette)
    private detteRepo: Repository<Dette>,
  ) {}

  // Avances
  async createAvance(data: Partial<AvanceIntrant>) {
    const avance = await this.avanceRepo.save(data);
    // Mettre à jour ou créer la dette du pisciculteur
    let dette = await this.detteRepo.findOne({ where: { pisciculteur_id: avance.pisciculteur_id } });
    if (dette) {
      dette.solde += avance.montant;
      dette.montant_initial += avance.montant;
      dette.statut = DetteStatut.EN_COURS;
      await this.detteRepo.save(dette);
    } else {
      dette = this.detteRepo.create({
        pisciculteur_id: avance.pisciculteur_id,
        montant_initial: avance.montant,
        solde: avance.montant,
        statut: DetteStatut.EN_COURS,
      });
      await this.detteRepo.save(dette);
    }
    return avance;
  }
  findAllAvances() {
    return this.avanceRepo.find({ relations: ['pisciculteur', 'livraison', 'remboursements'] });
  }
  findOneAvance(id: number) {
    return this.avanceRepo.findOne({ where: { id }, relations: ['pisciculteur', 'livraison', 'remboursements'] });
  }
  updateAvance(id: number, data: Partial<AvanceIntrant>) {
    return this.avanceRepo.update(id, data);
  }
  removeAvance(id: number) {
    return this.avanceRepo.delete(id);
  }

  // Remboursements
  async createRemboursement(data: Partial<Remboursement>) {
    const remboursement = await this.remboursementRepo.save(data);
    // Mettre à jour la dette et l'avance associées
    const avance = await this.avanceRepo.findOne({ where: { id: data.avance_id } });
    if (avance) {
      const dette = await this.detteRepo.findOne({ where: { pisciculteur_id: avance.pisciculteur_id } });
      if (dette) {
        if (typeof data.montant !== 'number') {
          throw new Error('Le montant du remboursement est requis.');
        }
        dette.solde -= data.montant;
        if (dette.solde <= 0) {
          dette.solde = 0;
          dette.statut = DetteStatut.REGLEE;
          avance.statut = AvanceStatut.REMBOURSEE;
        } else {
          dette.statut = DetteStatut.EN_COURS;
        }
        await this.detteRepo.save(dette);
        await this.avanceRepo.save(avance);
      }
    }
    return remboursement;
  }
  findAllRemboursements() {
    return this.remboursementRepo.find({ relations: ['avance', 'pisciculteur'] });
  }
  findOneRemboursement(id: number) {
    return this.remboursementRepo.findOne({ where: { id }, relations: ['avance', 'pisciculteur'] });
  }
  updateRemboursement(id: number, data: Partial<Remboursement>) {
    return this.remboursementRepo.update(id, data);
  }
  removeRemboursement(id: number) {
    return this.remboursementRepo.delete(id);
  }

  // Dettes
  createDette(data: Partial<Dette>) {
    return this.detteRepo.save(data);
  }
  findAllDettes() {
    return this.detteRepo.find({ relations: ['pisciculteur'] });
  }
  findOneDette(id: number) {
    return this.detteRepo.findOne({ where: { id }, relations: ['pisciculteur'] });
  }
  updateDette(id: number, data: Partial<Dette>) {
    return this.detteRepo.update(id, data);
  }
  removeDette(id: number) {
    return this.detteRepo.delete(id);
  }
} 