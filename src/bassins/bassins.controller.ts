import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BassinsService } from './bassins.service';
import { CreateBassinDto } from './dto/create-bassin.dto';
import { UpdateBassinDto } from './dto/update-bassin.dto';
import { AssignBassinDto } from './dto/assign-bassin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('bassins')
@Controller('bassins')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BassinsController {
    constructor(private readonly bassinsService: BassinsService) {}

    @Post()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Créer un nouveau bassin' })
    @ApiResponse({ status: 201, description: 'Bassin créé avec succès' })
    @ApiBody({ type: CreateBassinDto })
    create(@Body() createBassinDto: CreateBassinDto) {
        return this.bassinsService.create(createBassinDto);
    }

    @Get()
    @Roles(Role.ADMIN, Role.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer tous les bassins' })
    @ApiResponse({ status: 200, description: 'Liste des bassins récupérée avec succès' })
    findAll() {
        return this.bassinsService.findAll();
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer un bassin par son ID' })
    @ApiResponse({ status: 200, description: 'Bassin récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Bassin non trouvé' })
    findOne(@Param('id') id: string) {
        return this.bassinsService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour un bassin' })
    @ApiResponse({ status: 200, description: 'Bassin mis à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Bassin non trouvé' })
    update(@Param('id') id: string, @Body() updateBassinDto: UpdateBassinDto) {
        return this.bassinsService.update(+id, updateBassinDto);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer un bassin' })
    @ApiResponse({ status: 200, description: 'Bassin supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Bassin non trouvé' })
    remove(@Param('id') id: string) {
        return this.bassinsService.remove(+id);
    }

    @Post('assign')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Assigner un bassin à un pisciculteur' })
    @ApiResponse({ status: 201, description: 'Bassin assigné avec succès' })
    @ApiResponse({ status: 400, description: 'Bassin déjà assigné' })
    @ApiBody({ type: AssignBassinDto })
    assignBassin(@Body() assignBassinDto: AssignBassinDto) {
        return this.bassinsService.assignBassin(assignBassinDto);
    }

    @Post(':id/unassign/:pisciculteurId')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Désassigner un bassin d\'un pisciculteur' })
    @ApiResponse({ status: 200, description: 'Bassin désassigné avec succès' })
    @ApiResponse({ status: 404, description: 'Assignment non trouvé' })
    unassignBassin(
        @Param('id') id: string,
        @Param('pisciculteurId') pisciculteurId: string,
    ) {
        return this.bassinsService.unassignBassin(+id, +pisciculteurId);
    }

    @Get('pisciculteur/:pisciculteurId')
    @Roles(Role.ADMIN, Role.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer les bassins d\'un pisciculteur' })
    @ApiResponse({ status: 200, description: 'Liste des bassins récupérée avec succès' })
    getPisciculteurBassins(@Param('pisciculteurId') pisciculteurId: string) {
        return this.bassinsService.getPisciculteurBassins(+pisciculteurId);
    }

    @Get('pisciculteur/:pisciculteurId/detailed')
    @Roles(Role.ADMIN, Role.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer les bassins détaillés d\'un pisciculteur avec performances et pêches' })
    @ApiResponse({ status: 200, description: 'Liste des bassins détaillés récupérée' })
    getBassinsByPisciculteur(@Param('pisciculteurId') pisciculteurId: string) {
        return this.bassinsService.getBassinsByPisciculteur(+pisciculteurId);
    }

    @Get('sans-pisciculteur')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les bassins sans pisciculteur assigné' })
    @ApiResponse({ status: 200, description: 'Liste des bassins sans pisciculteur' })
    getBassinsWithoutPisciculteur() {
        return this.bassinsService.getBassinsWithoutPisciculteur();
    }

    @Get('status/:status')
    @Roles(Role.ADMIN, Role.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer les bassins par statut' })
    @ApiResponse({ status: 200, description: 'Liste des bassins par statut' })
    getBassinsByStatus(@Param('status') status: string) {
        return this.bassinsService.getBassinsByStatus(status as any);
    }

    @Get('region/:regionId')
    @Roles(Role.ADMIN, Role.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer les bassins par région' })
    @ApiResponse({ status: 200, description: 'Liste des bassins par région' })
    getBassinsByRegion(@Param('regionId') regionId: string) {
        return this.bassinsService.getBassinsByRegion(+regionId);
    }

    @Get('summary/statistiques')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les statistiques générales des bassins' })
    @ApiResponse({ status: 200, description: 'Statistiques des bassins récupérées' })
    getBassinsSummary() {
        return this.bassinsService.getBassinsSummary();
    }
} 