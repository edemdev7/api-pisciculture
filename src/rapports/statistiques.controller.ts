import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { StatistiquesService } from './statistiques.service';
import { CreateStatistiqueDto } from './dto/create-statistique.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TypeStatistique } from './entities/statistique.entity';

@ApiTags('statistiques')
@ApiBearerAuth()
@Controller('statistiques')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StatistiquesController {
    constructor(private readonly statistiquesService: StatistiquesService) {}

    @Post()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Créer une nouvelle statistique' })
    @ApiResponse({ status: 201, description: 'Statistique créée avec succès' })
    create(@Body() createStatistiqueDto: CreateStatistiqueDto, @Request() req) {
        return this.statistiquesService.create(createStatistiqueDto, req.user);
    }

    @Get()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer toutes les statistiques' })
    @ApiResponse({ status: 200, description: 'Liste des statistiques récupérée avec succès' })
    findAll() {
        return this.statistiquesService.findAll();
    }

    @Get('type/:type')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les statistiques par type' })
    @ApiResponse({ status: 200, description: 'Liste des statistiques récupérée avec succès' })
    findByType(@Param('type') type: TypeStatistique) {
        return this.statistiquesService.findByType(type);
    }

    @Get('periode')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les statistiques par période' })
    @ApiResponse({ status: 200, description: 'Liste des statistiques récupérée avec succès' })
    @ApiQuery({ name: 'debut', required: true, type: Date })
    @ApiQuery({ name: 'fin', required: true, type: Date })
    findByPeriode(
        @Query('debut') debut: Date,
        @Query('fin') fin: Date,
    ) {
        return this.statistiquesService.findByPeriode(debut, fin);
    }

    @Get(':id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer une statistique par son ID' })
    @ApiResponse({ status: 200, description: 'Statistique récupérée avec succès' })
    @ApiResponse({ status: 404, description: 'Statistique non trouvée' })
    findOne(@Param('id') id: string) {
        return this.statistiquesService.findOne(+id);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer une statistique' })
    @ApiResponse({ status: 200, description: 'Statistique supprimée avec succès' })
    @ApiResponse({ status: 404, description: 'Statistique non trouvée' })
    remove(@Param('id') id: string) {
        return this.statistiquesService.remove(+id);
    }
} 