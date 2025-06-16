import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MaladiesService } from './maladies.service';
import { CreateMaladieDto } from './dto/create-maladie.dto';
import { UpdateMaladieDto } from './dto/update-maladie.dto';
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto';
import { CreateTraitementDto } from './dto/create-traitement.dto';
import { UpdateTraitementDto } from './dto/update-traitement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Maladie } from './entities/maladie.entity';
import { Diagnostic } from './entities/diagnostic.entity';
import { Traitement } from './entities/traitement.entity';

@ApiTags('maladies')
@ApiBearerAuth()
@Controller('maladies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MaladiesController {
    constructor(private readonly maladiesService: MaladiesService) {}

    // Routes pour les maladies
    @Post()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Créer une nouvelle maladie' })
    @ApiResponse({ status: 201, description: 'Maladie créée avec succès' })
    create(@Body() createMaladieDto: CreateMaladieDto) {
        return this.maladiesService.create(createMaladieDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer toutes les maladies' })
    @ApiResponse({ status: 200, description: 'Liste des maladies récupérée avec succès' })
    findAll() {
        return this.maladiesService.findAll();
    }

    @Get(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer une maladie par son ID' })
    @ApiResponse({ status: 200, description: 'Maladie récupérée avec succès' })
    @ApiResponse({ status: 404, description: 'Maladie non trouvée' })
    findOne(@Param('id') id: string) {
        return this.maladiesService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour une maladie' })
    @ApiResponse({ status: 200, description: 'Maladie mise à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Maladie non trouvée' })
    update(@Param('id') id: string, @Body() updateMaladieDto: UpdateMaladieDto) {
        return this.maladiesService.update(+id, updateMaladieDto);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer une maladie' })
    @ApiResponse({ status: 200, description: 'Maladie supprimée avec succès' })
    @ApiResponse({ status: 404, description: 'Maladie non trouvée' })
    remove(@Param('id') id: string) {
        return this.maladiesService.remove(+id);
    }

    // Routes pour les diagnostics
    @Post('diagnostics')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Créer un nouveau diagnostic' })
    @ApiResponse({ status: 201, description: 'Diagnostic créé avec succès' })
    createDiagnostic(@Body() createDiagnosticDto: CreateDiagnosticDto, @Request() req) {
        return this.maladiesService.createDiagnostic(createDiagnosticDto, req.user.id);
    }

    @Get('diagnostics')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer tous les diagnostics' })
    @ApiResponse({ status: 200, description: 'Liste des diagnostics récupérée avec succès' })
    findAllDiagnostics() {
        return this.maladiesService.findAllDiagnostics();
    }

    @Get('diagnostics/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer un diagnostic par son ID' })
    @ApiResponse({ status: 200, description: 'Diagnostic récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Diagnostic non trouvé' })
    findOneDiagnostic(@Param('id') id: string) {
        return this.maladiesService.findOneDiagnostic(+id);
    }

    @Patch('diagnostics/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour un diagnostic' })
    @ApiResponse({ status: 200, description: 'Diagnostic mis à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Diagnostic non trouvé' })
    updateDiagnostic(@Param('id') id: string, @Body() updateDiagnosticDto: UpdateDiagnosticDto) {
        return this.maladiesService.updateDiagnostic(+id, updateDiagnosticDto);
    }

    @Delete('diagnostics/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer un diagnostic' })
    @ApiResponse({ status: 200, description: 'Diagnostic supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Diagnostic non trouvé' })
    removeDiagnostic(@Param('id') id: string) {
        return this.maladiesService.removeDiagnostic(+id);
    }

    // Routes pour les traitements
    @Post('traitements')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Créer un nouveau traitement' })
    @ApiResponse({ status: 201, description: 'Traitement créé avec succès' })
    createTraitement(@Body() createTraitementDto: CreateTraitementDto, @Request() req) {
        return this.maladiesService.createTraitement(createTraitementDto, req.user.id);
    }

    @Get('traitements')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer tous les traitements' })
    @ApiResponse({ status: 200, description: 'Liste des traitements récupérée avec succès' })
    findAllTraitements() {
        return this.maladiesService.findAllTraitements();
    }

    @Get('traitements/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer un traitement par son ID' })
    @ApiResponse({ status: 200, description: 'Traitement récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Traitement non trouvé' })
    findOneTraitement(@Param('id') id: string) {
        return this.maladiesService.findOneTraitement(+id);
    }

    @Patch('traitements/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour un traitement' })
    @ApiResponse({ status: 200, description: 'Traitement mis à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Traitement non trouvé' })
    updateTraitement(@Param('id') id: string, @Body() updateTraitementDto: UpdateTraitementDto) {
        return this.maladiesService.updateTraitement(+id, updateTraitementDto);
    }

    @Delete('traitements/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer un traitement' })
    @ApiResponse({ status: 200, description: 'Traitement supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Traitement non trouvé' })
    removeTraitement(@Param('id') id: string) {
        return this.maladiesService.removeTraitement(+id);
    }

    // Routes utilitaires
    @Get('bassins/:bassinId/diagnostics')
    @Roles(Role.ADMIN, Role.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer les diagnostics d\'un bassin' })
    @ApiResponse({ status: 200, description: 'Liste des diagnostics du bassin', type: [Diagnostic] })
    getDiagnosticsByBassin(@Param('bassinId') bassinId: string) {
        return this.maladiesService.getDiagnosticsByBassin(+bassinId);
    }

    @Get('diagnostics/:diagnosticId/traitements')
    @Roles(Role.ADMIN, Role.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer les traitements d\'un diagnostic' })
    @ApiResponse({ status: 200, description: 'Liste des traitements du diagnostic', type: [Traitement] })
    getTraitementsByDiagnostic(@Param('diagnosticId') diagnosticId: string) {
        return this.maladiesService.getTraitementsByDiagnostic(+diagnosticId);
    }

    @Get('diagnostics/en-cours')
    @Roles(Role.ADMIN, Role.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer les diagnostics en cours' })
    @ApiResponse({ status: 200, description: 'Liste des diagnostics en cours', type: [Diagnostic] })
    getDiagnosticsEnCours() {
        return this.maladiesService.getDiagnosticsEnCours();
    }
} 