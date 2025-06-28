import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ActivitesService } from '../services/activites.service';
import { CreateActiviteDto } from '../dto/create-activite.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RoleEnum } from '../enums/role.enum';

@ApiTags('Activités Pisciculteurs')
@Controller('activites-pisciculteurs')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ActivitesController {
    constructor(private readonly activitesService: ActivitesService) {}

    @Post(':pisciculteurId')
    @Roles(RoleEnum.ADMIN)
    @ApiOperation({ summary: 'Créer une nouvelle activité pour un pisciculteur' })
    @ApiResponse({ status: 201, description: 'Activité créée avec succès' })
    @ApiResponse({ status: 403, description: 'Accès interdit' })
    async createActivite(
        @Param('pisciculteurId') pisciculteurId: number,
        @Body() createActiviteDto: CreateActiviteDto,
    ) {
        return await this.activitesService.createActivite(pisciculteurId, createActiviteDto);
    }

    @Get(':pisciculteurId')
    @Roles(RoleEnum.ADMIN)
    @ApiOperation({ summary: 'Récupérer l\'historique des activités d\'un pisciculteur' })
    @ApiQuery({ name: 'page', required: false, description: 'Numéro de page' })
    @ApiQuery({ name: 'limit', required: false, description: 'Nombre d\'éléments par page' })
    @ApiResponse({ status: 200, description: 'Historique des activités récupéré' })
    @ApiResponse({ status: 403, description: 'Accès interdit' })
    async getActivitesByPisciculteur(
        @Param('pisciculteurId') pisciculteurId: number,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return await this.activitesService.getActivitesByPisciculteur(pisciculteurId, page, limit);
    }

    @Get(':pisciculteurId/statistiques')
    @Roles(RoleEnum.ADMIN)
    @ApiOperation({ summary: 'Récupérer les statistiques d\'activités d\'un pisciculteur' })
    @ApiResponse({ status: 200, description: 'Statistiques récupérées' })
    @ApiResponse({ status: 403, description: 'Accès interdit' })
    async getStatistiquesActivites(@Param('pisciculteurId') pisciculteurId: number) {
        return await this.activitesService.getStatistiquesActivites(pisciculteurId);
    }
} 