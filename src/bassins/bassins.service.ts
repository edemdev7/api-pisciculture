import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bassin } from './entities/bassin.entity';
import { PisciculteurBassin, PisciculteurBassinStatus } from './entities/pisciculteur-bassin.entity';
import { CreateBassinDto } from './dto/create-bassin.dto';
import { UpdateBassinDto } from './dto/update-bassin.dto';
import { AssignBassinDto } from './dto/assign-bassin.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BassinsService {
  constructor(
    @InjectRepository(Bassin)
    private bassinRepository: Repository<Bassin>,
    @InjectRepository(PisciculteurBassin)
    private pisciculteurBassinRepository: Repository<PisciculteurBassin>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createBassinDto: CreateBassinDto) {
    const bassin = this.bassinRepository.create(createBassinDto);
    return await this.bassinRepository.save(bassin);
  }

  async findAll() {
    return await this.bassinRepository.find({
      relations: ['pisciculteurs', 'pisciculteurs.pisciculteur']
    });
  }

  async findOne(id: number) {
    const bassin = await this.bassinRepository.findOne({
      where: { id },
      relations: ['pisciculteurs', 'pisciculteurs.pisciculteur']
    });

    if (!bassin) {
      throw new NotFoundException(`Bassin #${id} non trouvé`);
    }

    return bassin;
  }

  async update(id: number, updateBassinDto: UpdateBassinDto) {
    const bassin = await this.findOne(id);
    Object.assign(bassin, updateBassinDto);
    return await this.bassinRepository.save(bassin);
  }

  async remove(id: number) {
    const bassin = await this.findOne(id);
    return await this.bassinRepository.remove(bassin);
  }

  async assignBassin(assignBassinDto: AssignBassinDto): Promise<PisciculteurBassin> {
    const bassin = await this.findOne(assignBassinDto.bassin_id);
    const pisciculteur = await this.userRepository.findOne({
      where: { id: assignBassinDto.pisciculteur_id }
    });

    if (!pisciculteur) {
      throw new NotFoundException(`Pisciculteur avec l'ID ${assignBassinDto.pisciculteur_id} non trouvé`);
    }

    // Vérifier si le bassin est déjà assigné
    const existingAssignment = await this.pisciculteurBassinRepository.findOne({
      where: {
        bassin_id: assignBassinDto.bassin_id,
        pisciculteur_id: assignBassinDto.pisciculteur_id,
        statut: PisciculteurBassinStatus.ACTIF
      }
    });

    if (existingAssignment) {
      throw new BadRequestException('Ce bassin est déjà assigné à ce pisciculteur');
    }

    const assignment = this.pisciculteurBassinRepository.create({
      bassin_id: assignBassinDto.bassin_id,
      pisciculteur_id: assignBassinDto.pisciculteur_id,
      statut: PisciculteurBassinStatus.ACTIF
    });

    return await this.pisciculteurBassinRepository.save(assignment);
  }

  async unassignBassin(bassinId: number, pisciculteurId: number): Promise<void> {
    const assignment = await this.pisciculteurBassinRepository.findOne({
      where: {
        bassin_id: bassinId,
        pisciculteur_id: pisciculteurId,
        statut: PisciculteurBassinStatus.ACTIF
      }
    });

    if (!assignment) {
      throw new NotFoundException('Assignment non trouvé');
    }

    assignment.statut = PisciculteurBassinStatus.TERMINE;
    await this.pisciculteurBassinRepository.save(assignment);
  }

  async getPisciculteurBassins(pisciculteurId: number): Promise<Bassin[]> {
    const assignments = await this.pisciculteurBassinRepository.find({
      where: {
        pisciculteur_id: pisciculteurId,
        statut: PisciculteurBassinStatus.ACTIF
      },
      relations: ['bassin']
    });

    return assignments.map(assignment => assignment.bassin);
  }
} 