import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PerformancesService } from '../services/performances.service';
import { CreatePerformanceBassinDto } from '../dto/create-performance-bassin.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RoleEnum } from '../../users/enums/role.enum';

@ApiTags('Performances Bassins')
@Controller('bassins/:bassinId/performances')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PerformancesController {
    constructor(private readonly performancesService: PerformancesService) {}

    @Post()
    @Roles(RoleEnum.ADMIN, RoleEnum.PISCICULTEUR)
    @ApiOperation({ summary: 'Créer une nouvelle mesure de performance pour un bassin' })
    @ApiResponse({ status: 201, description: 'Performance créée avec succès' })
    @ApiResponse({ status: 404, description: 'Bassin non trouvé' })
    async create(
        @Param('bassinId') bassinId: number,
        @Body() createPerformanceDto: CreatePerformanceBassinDto,
    ) {
        return await this.performancesService.create(bassinId, createPerformanceDto);
    }

    @Get()
    @Roles(RoleEnum.ADMIN, RoleEnum.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer toutes les performances d\'un bassin' })
    @ApiResponse({ status: 200, description: 'Liste des performances récupérée' })
    async findAllByBassin(@Param('bassinId') bassinId: number) {
        return await this.performancesService.findAllByBassin(bassinId);
    }

    @Get('statistiques')
    @Roles(RoleEnum.ADMIN, RoleEnum.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer les statistiques de performance d\'un bassin' })
    @ApiResponse({ status: 200, description: 'Statistiques récupérées' })
    async getStatistiques(@Param('bassinId') bassinId: number) {
        return await this.performancesService.getStatistiquesBassin(bassinId);
    }

    @Get(':id')
    @Roles(RoleEnum.ADMIN, RoleEnum.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer une performance spécifique' })
    @ApiResponse({ status: 200, description: 'Performance récupérée' })
    @ApiResponse({ status: 404, description: 'Performance non trouvée' })
    async findOne(@Param('id') id: number) {
        return await this.performancesService.findOne(id);
    }
} 