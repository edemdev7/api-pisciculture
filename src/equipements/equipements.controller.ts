import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch, Query } from '@nestjs/common';
import { EquipementsService } from './equipements.service';
import { CreateEquipementDto } from './dto/create-equipement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { StatutEquipement, TypeEquipement } from './entities/equipement.entity';

@ApiTags('equipements')
@ApiBearerAuth()
@Controller('equipements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EquipementsController {
    constructor(private readonly equipementsService: EquipementsService) {}

    @Post()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Créer un nouvel équipement' })
    @ApiResponse({ status: 201, description: 'Équipement créé avec succès' })
    create(@Body() createEquipementDto: CreateEquipementDto) {
        return this.equipementsService.create(createEquipementDto);
    }

    @Get()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer tous les équipements' })
    @ApiResponse({ status: 200, description: 'Liste des équipements récupérée avec succès' })
    findAll() {
        return this.equipementsService.findAll();
    }

    @Get('type/:type')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les équipements par type' })
    @ApiResponse({ status: 200, description: 'Liste des équipements récupérée avec succès' })
    findByType(@Param('type') type: TypeEquipement) {
        return this.equipementsService.findByType(type);
    }

    @Get('statut/:statut')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les équipements par statut' })
    @ApiResponse({ status: 200, description: 'Liste des équipements récupérée avec succès' })
    findByStatut(@Param('statut') statut: StatutEquipement) {
        return this.equipementsService.findByStatut(statut);
    }

    @Get(':id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer un équipement par son ID' })
    @ApiResponse({ status: 200, description: 'Équipement récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Équipement non trouvé' })
    findOne(@Param('id') id: string) {
        return this.equipementsService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour un équipement' })
    @ApiResponse({ status: 200, description: 'Équipement mis à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Équipement non trouvé' })
    update(
        @Param('id') id: string,
        @Body() updateEquipementDto: CreateEquipementDto,
    ) {
        return this.equipementsService.update(+id, updateEquipementDto);
    }

    @Patch(':id/statut')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour le statut d\'un équipement' })
    @ApiResponse({ status: 200, description: 'Statut mis à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Équipement non trouvé' })
    updateStatut(
        @Param('id') id: string,
        @Body('statut') statut: StatutEquipement,
    ) {
        return this.equipementsService.updateStatut(+id, statut);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer un équipement' })
    @ApiResponse({ status: 200, description: 'Équipement supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Équipement non trouvé' })
    remove(@Param('id') id: string) {
        return this.equipementsService.remove(+id);
    }
} 