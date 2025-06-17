import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MaintenancesService } from './maintenances.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('maintenances')
@ApiBearerAuth()
@Controller('maintenances')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MaintenancesController {
    constructor(private readonly maintenancesService: MaintenancesService) {}

    @Post()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Créer une nouvelle maintenance' })
    @ApiResponse({ status: 201, description: 'Maintenance créée avec succès' })
    create(@Body() createMaintenanceDto: CreateMaintenanceDto) {
        return this.maintenancesService.create(createMaintenanceDto);
    }

    @Get()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer toutes les maintenances' })
    @ApiResponse({ status: 200, description: 'Liste des maintenances récupérée avec succès' })
    findAll() {
        return this.maintenancesService.findAll();
    }

    @Get('equipement/:equipementId')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les maintenances d\'un équipement' })
    @ApiResponse({ status: 200, description: 'Liste des maintenances récupérée avec succès' })
    findByEquipement(@Param('equipementId') equipementId: string) {
        return this.maintenancesService.findByEquipement(+equipementId);
    }

    @Get('periode')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les maintenances sur une période' })
    @ApiResponse({ status: 200, description: 'Liste des maintenances récupérée avec succès' })
    @ApiQuery({ name: 'debut', type: Date })
    @ApiQuery({ name: 'fin', type: Date })
    findByDateRange(
        @Query('debut') debut: Date,
        @Query('fin') fin: Date,
    ) {
        return this.maintenancesService.findByDateRange(debut, fin);
    }

    @Get(':id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer une maintenance par son ID' })
    @ApiResponse({ status: 200, description: 'Maintenance récupérée avec succès' })
    @ApiResponse({ status: 404, description: 'Maintenance non trouvée' })
    findOne(@Param('id') id: string) {
        return this.maintenancesService.findOne(+id);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer une maintenance' })
    @ApiResponse({ status: 200, description: 'Maintenance supprimée avec succès' })
    @ApiResponse({ status: 404, description: 'Maintenance non trouvée' })
    remove(@Param('id') id: string) {
        return this.maintenancesService.remove(+id);
    }
} 