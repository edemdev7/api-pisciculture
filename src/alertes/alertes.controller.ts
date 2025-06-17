import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Patch } from '@nestjs/common';
import { AlertesService } from './alertes.service';
import { CreateAlerteDto } from './dto/create-alerte.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StatutAlerte } from './entities/alerte.entity';

@ApiTags('alertes')
@ApiBearerAuth()
@Controller('alertes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlertesController {
    constructor(private readonly alertesService: AlertesService) {}

    @Post()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Créer une nouvelle alerte' })
    @ApiResponse({ status: 201, description: 'Alerte créée avec succès' })
    create(@Body() createAlerteDto: CreateAlerteDto, @Request() req) {
        return this.alertesService.create(createAlerteDto, req.user);
    }

    @Get()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer toutes les alertes' })
    @ApiResponse({ status: 200, description: 'Liste des alertes récupérée avec succès' })
    findAll() {
        return this.alertesService.findAll();
    }

    @Get('mes-alertes')
    @Roles(Role.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer les alertes du pisciculteur connecté' })
    @ApiResponse({ status: 200, description: 'Liste des alertes récupérée avec succès' })
    findMyAlerts(@Request() req) {
        return this.alertesService.findByPisciculteur(req.user.id);
    }

    @Get(':id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer une alerte par son ID' })
    @ApiResponse({ status: 200, description: 'Alerte récupérée avec succès' })
    @ApiResponse({ status: 404, description: 'Alerte non trouvée' })
    findOne(@Param('id') id: string) {
        return this.alertesService.findOne(+id);
    }

    @Patch(':id/statut')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour le statut d\'une alerte' })
    @ApiResponse({ status: 200, description: 'Statut de l\'alerte mis à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Alerte non trouvée' })
    updateStatut(
        @Param('id') id: string,
        @Body('statut') statut: StatutAlerte,
    ) {
        return this.alertesService.updateStatut(+id, statut);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer une alerte' })
    @ApiResponse({ status: 200, description: 'Alerte supprimée avec succès' })
    @ApiResponse({ status: 404, description: 'Alerte non trouvée' })
    remove(@Param('id') id: string) {
        return this.alertesService.remove(+id);
    }
} 