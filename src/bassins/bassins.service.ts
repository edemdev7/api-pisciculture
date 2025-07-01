import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Bassin } from './entities/bassin.entity';
import { PisciculteurBassin, PisciculteurBassinStatus } from './entities/pisciculteur-bassin.entity';
import { CreateBassinDto } from './dto/create-bassin.dto';
import { UpdateBassinDto } from './dto/update-bassin.dto';
import { AssignBassinDto } from './dto/assign-bassin.dto';
import { User } from '../users/entities/user.entity';
import { Region } from '../regions/region.entity';
import { BassinStatus } from './entities/bassin.entity';

@Injectable()
export class BassinsService {
  constructor(
    @InjectRepository(Bassin)
    private bassinRepository: Repository<Bassin>,
    @InjectRepository(PisciculteurBassin)
    private pisciculteurBassinRepository: Repository<PisciculteurBassin>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Region)
    private regionsRepository: Repository<Region>,
  ) {}

  async create(createBassinDto: CreateBassinDto, adminId: number) {
    const region = await this.regionsRepository.findOne({ where: { id: createBassinDto.region_id } });
    if (!region) {
      throw new NotFoundException('Région non trouvée');
    }
    const bassin = this.bassinRepository.create({ 
      ...createBassinDto, 
      region,
      admin_id: adminId
    });
    return await this.bassinRepository.save(bassin);
  }

  async findAll() {
    const bassins = await this.bassinRepository.find({
      relations: ['region', 'performances', 'peches_controle']
    });

    // Pour chaque bassin, récupérer le pisciculteur assigné
    const bassinsAvecPisciculteurs = await Promise.all(
      bassins.map(async (bassin) => {
        const pisciculteur = await this.getPisciculteurByBassin(bassin.id);
        return {
          ...bassin,
          pisciculteur_assigne: pisciculteur
        };
      })
    );

    return bassinsAvecPisciculteurs;
  }

  async findOne(id: number) {
    const bassin = await this.bassinRepository.findOne({
      where: { id },
      relations: ['region', 'performances', 'peches_controle']
    });

    if (!bassin) {
      throw new NotFoundException(`Bassin #${id} non trouvé`);
    }

    // Récupérer le pisciculteur assigné
    const pisciculteur = await this.getPisciculteurByBassin(id);

    // Retourner le bassin avec le pisciculteur assigné (peut être null)
    return {
      ...bassin,
      pisciculteur_assigne: pisciculteur
    };
  }

  async update(id: number, updateBassinDto: UpdateBassinDto) {
    const bassin = await this.findOne(id);
    if (updateBassinDto.region_id) {
      const region = await this.regionsRepository.findOne({ where: { id: updateBassinDto.region_id } });
      if (!region) {
        throw new NotFoundException('Région non trouvée');
      }
      bassin.region = region;
    }
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
      date_affectation: new Date(),
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
    assignment.date_fin_affectation = new Date();
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

    const bassins = assignments.map(assignment => assignment.bassin);
    
    // Ajouter le pisciculteur assigné à chaque bassin
    const bassinsAvecPisciculteurs = await Promise.all(
      bassins.map(async (bassin) => {
        const pisciculteur = await this.getPisciculteurByBassin(bassin.id);
        return {
          ...bassin,
          pisciculteur_assigne: pisciculteur
        };
      })
    );

    return bassinsAvecPisciculteurs;
  }

  async getBassinsByPisciculteur(pisciculteurId: number): Promise<Bassin[]> {
    const assignments = await this.pisciculteurBassinRepository.find({
      where: {
        pisciculteur_id: pisciculteurId,
        statut: PisciculteurBassinStatus.ACTIF
      },
      relations: ['bassin', 'bassin.region', 'bassin.performances', 'bassin.peches_controle']
    });

    const bassins = assignments.map(assignment => assignment.bassin);
    
    // Ajouter le pisciculteur assigné à chaque bassin
    const bassinsAvecPisciculteurs = await Promise.all(
      bassins.map(async (bassin) => {
        const pisciculteur = await this.getPisciculteurByBassin(bassin.id);
        return {
          ...bassin,
          pisciculteur_assigne: pisciculteur
        };
      })
    );

    return bassinsAvecPisciculteurs;
  }

  async getBassinsWithoutPisciculteur(): Promise<Bassin[]> {
    // Get all bassins that don't have active assignments
    const assignedBassinIds = await this.pisciculteurBassinRepository
      .createQueryBuilder('pb')
      .select('pb.bassin_id')
      .where('pb.statut = :status', { status: PisciculteurBassinStatus.ACTIF })
      .getRawMany();

    const assignedIds = assignedBassinIds.map(item => item.pb_bassin_id);
    
    let bassins;
    if (assignedIds.length === 0) {
      bassins = await this.bassinRepository.find({
        relations: ['region'],
      });
    } else {
      bassins = await this.bassinRepository
        .createQueryBuilder('bassin')
        .leftJoinAndSelect('bassin.region', 'region')
        .where('bassin.id NOT IN (:...ids)', { ids: assignedIds })
        .getMany();
    }
    
    // Ajouter le pisciculteur assigné à chaque bassin (sera null pour ces bassins)
    const bassinsAvecPisciculteurs = await Promise.all(
      bassins.map(async (bassin) => {
        const pisciculteur = await this.getPisciculteurByBassin(bassin.id);
        return {
          ...bassin,
          pisciculteur_assigne: pisciculteur
        };
      })
    );

    return bassinsAvecPisciculteurs;
  }

  async getBassinsByStatus(status: BassinStatus): Promise<Bassin[]> {
    const bassins = await this.bassinRepository.find({
      where: { statut: status },
      relations: ['region'],
    });
    
    // Ajouter le pisciculteur assigné à chaque bassin
    const bassinsAvecPisciculteurs = await Promise.all(
      bassins.map(async (bassin) => {
        const pisciculteur = await this.getPisciculteurByBassin(bassin.id);
        return {
          ...bassin,
          pisciculteur_assigne: pisciculteur
        };
      })
    );

    return bassinsAvecPisciculteurs;
  }

  async getBassinsByRegion(regionId: number): Promise<Bassin[]> {
    const bassins = await this.bassinRepository.find({
      where: { region: { id: regionId } },
      relations: ['region'],
    });
    
    // Ajouter le pisciculteur assigné à chaque bassin
    const bassinsAvecPisciculteurs = await Promise.all(
      bassins.map(async (bassin) => {
        const pisciculteur = await this.getPisciculteurByBassin(bassin.id);
        return {
          ...bassin,
          pisciculteur_assigne: pisciculteur
        };
      })
    );

    return bassinsAvecPisciculteurs;
  }

  async getBassinsSummary(): Promise<any> {
    const totalBassins = await this.bassinRepository.count();
    const bassinsActifs = await this.bassinRepository.count({ where: { statut: BassinStatus.ACTIF } });
    const bassinsInactifs = await this.bassinRepository.count({ where: { statut: BassinStatus.INACTIF } });
    const bassinsEnMaintenance = await this.bassinRepository.count({ where: { statut: BassinStatus.EN_MAINTENANCE } });
    
    // Count bassins without active pisciculteur assignments
    const assignedBassinIds = await this.pisciculteurBassinRepository
      .createQueryBuilder('pb')
      .select('pb.bassin_id')
      .where('pb.statut = :status', { status: PisciculteurBassinStatus.ACTIF })
      .getRawMany();
    const bassinsSansPisciculteur = totalBassins - assignedBassinIds.length;

    return {
      total: totalBassins,
      actifs: bassinsActifs,
      inactifs: bassinsInactifs,
      en_maintenance: bassinsEnMaintenance,
      sans_pisciculteur: bassinsSansPisciculteur,
    };
  }

  async getPisciculteurByBassin(bassinId: number): Promise<User | null> {
    const assignment = await this.pisciculteurBassinRepository.findOne({
      where: {
        bassin_id: bassinId,
        statut: PisciculteurBassinStatus.ACTIF
      },
      relations: ['pisciculteur', 'pisciculteur.role', 'pisciculteur.region']
    });

    return assignment ? assignment.pisciculteur : null;
  }

  async getBassinWithPisciculteur(bassinId: number): Promise<any> {
    const bassin = await this.bassinRepository.findOne({
      where: { id: bassinId },
      relations: ['region', 'performances', 'peches_controle']
    });

    if (!bassin) {
      throw new NotFoundException(`Bassin #${bassinId} non trouvé`);
    }

    const pisciculteur = await this.getPisciculteurByBassin(bassinId);

    return {
      ...bassin,
      pisciculteur_assigne: pisciculteur
    };
  }
} 