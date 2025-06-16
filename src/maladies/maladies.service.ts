import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maladie } from './entities/maladie.entity';
import { Diagnostic, StatutDiagnostic } from './entities/diagnostic.entity';
import { Traitement } from './entities/traitement.entity';
import { CreateMaladieDto } from './dto/create-maladie.dto';
import { UpdateMaladieDto } from './dto/update-maladie.dto';
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto';
import { CreateTraitementDto } from './dto/create-traitement.dto';
import { UpdateTraitementDto } from './dto/update-traitement.dto';

@Injectable()
export class MaladiesService {
    constructor(
        @InjectRepository(Maladie)
        private maladieRepository: Repository<Maladie>,
        @InjectRepository(Diagnostic)
        private diagnosticRepository: Repository<Diagnostic>,
        @InjectRepository(Traitement)
        private traitementRepository: Repository<Traitement>,
    ) {}

    // Gestion des maladies
    async create(createMaladieDto: CreateMaladieDto): Promise<Maladie> {
        const maladie = this.maladieRepository.create(createMaladieDto);
        return await this.maladieRepository.save(maladie);
    }

    async findAll(): Promise<Maladie[]> {
        return await this.maladieRepository.find({
            where: { est_actif: true },
            relations: ['diagnostics'],
        });
    }

    async findOne(id: number): Promise<Maladie> {
        const maladie = await this.maladieRepository.findOne({
            where: { id, est_actif: true },
            relations: ['diagnostics'],
        });
        if (!maladie) {
            throw new NotFoundException(`Maladie avec l'ID ${id} non trouvée`);
        }
        return maladie;
    }

    async update(id: number, updateMaladieDto: UpdateMaladieDto): Promise<Maladie> {
        const maladie = await this.findOne(id);
        Object.assign(maladie, updateMaladieDto);
        return await this.maladieRepository.save(maladie);
    }

    async remove(id: number): Promise<void> {
        const maladie = await this.findOne(id);
        maladie.est_actif = false;
        await this.maladieRepository.save(maladie);
    }

    // Gestion des diagnostics
    async createDiagnostic(createDiagnosticDto: CreateDiagnosticDto, userId: number): Promise<Diagnostic> {
        const diagnostic = this.diagnosticRepository.create({
            ...createDiagnosticDto,
            pisciculteur: { id: userId },
        });
        return await this.diagnosticRepository.save(diagnostic);
    }

    async findAllDiagnostics(): Promise<Diagnostic[]> {
        return await this.diagnosticRepository.find({
            relations: ['maladie', 'bassin', 'pisciculteur', 'traitements'],
        });
    }

    async findOneDiagnostic(id: number): Promise<Diagnostic> {
        const diagnostic = await this.diagnosticRepository.findOne({
            where: { id },
            relations: ['maladie', 'bassin', 'pisciculteur', 'traitements'],
        });
        if (!diagnostic) {
            throw new NotFoundException(`Diagnostic avec l'ID ${id} non trouvé`);
        }
        return diagnostic;
    }

    async updateDiagnostic(id: number, updateDiagnosticDto: UpdateDiagnosticDto): Promise<Diagnostic> {
        const diagnostic = await this.findOneDiagnostic(id);
        Object.assign(diagnostic, updateDiagnosticDto);
        return await this.diagnosticRepository.save(diagnostic);
    }

    async removeDiagnostic(id: number): Promise<void> {
        const diagnostic = await this.findOneDiagnostic(id);
        await this.diagnosticRepository.remove(diagnostic);
    }

    // Gestion des traitements
    async createTraitement(createTraitementDto: CreateTraitementDto, userId: number): Promise<Traitement> {
        const diagnostic = await this.findOneDiagnostic(createTraitementDto.diagnostic_id);
        const traitement = this.traitementRepository.create({
            ...createTraitementDto,
            diagnostic,
            pisciculteur: { id: userId },
        });
        return await this.traitementRepository.save(traitement);
    }

    async findAllTraitements(): Promise<Traitement[]> {
        return await this.traitementRepository.find({
            relations: ['diagnostic', 'pisciculteur'],
        });
    }

    async findOneTraitement(id: number): Promise<Traitement> {
        const traitement = await this.traitementRepository.findOne({
            where: { id },
            relations: ['diagnostic', 'pisciculteur'],
        });
        if (!traitement) {
            throw new NotFoundException(`Traitement avec l'ID ${id} non trouvé`);
        }
        return traitement;
    }

    async updateTraitement(id: number, updateTraitementDto: UpdateTraitementDto): Promise<Traitement> {
        const traitement = await this.findOneTraitement(id);
        Object.assign(traitement, updateTraitementDto);
        return await this.traitementRepository.save(traitement);
    }

    async removeTraitement(id: number): Promise<void> {
        const traitement = await this.findOneTraitement(id);
        await this.traitementRepository.remove(traitement);
    }

    // Méthodes utilitaires
    async getDiagnosticsByBassin(bassinId: number): Promise<Diagnostic[]> {
        return await this.diagnosticRepository.find({
            where: { bassin: { id: bassinId } },
            relations: ['maladie', 'traitements'],
        });
    }

    async getTraitementsByDiagnostic(diagnosticId: number): Promise<Traitement[]> {
        return await this.traitementRepository.find({
            where: { diagnostic: { id: diagnosticId } },
            relations: ['pisciculteur'],
        });
    }

    async getDiagnosticsEnCours(): Promise<Diagnostic[]> {
        return await this.diagnosticRepository.find({
            where: { statut: StatutDiagnostic.EN_COURS },
            relations: ['maladie', 'bassin', 'traitements'],
        });
    }
} 