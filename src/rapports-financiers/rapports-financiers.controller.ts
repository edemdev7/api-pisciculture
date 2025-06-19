import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RapportsFinanciersService } from './rapports-financiers.service';
import { CreateRapportFinancierDto } from './dto/create-rapport-financier.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { TypeRapportFinancier } from './entities/rapport-financier.entity';

@ApiTags('rapports-financiers')
@ApiBearerAuth()
@Controller('rapports-financiers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RapportsFinanciersController {
    constructor(private readonly rapportsFinanciersService: RapportsFinanciersService) {}

    @Post()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Créer un nouveau rapport financier' })
    @ApiResponse({ status: 201, description: 'Rapport créé avec succès' })
    @ApiBody({ type: CreateRapportFinancierDto })
    create(@Body() createRapportFinancierDto: CreateRapportFinancierDto) {
        return this.rapportsFinanciersService.create(createRapportFinancierDto);
    }

    @Get()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer tous les rapports financiers' })
    @ApiResponse({ status: 200, description: 'Liste des rapports récupérée avec succès' })
    findAll() {
        return this.rapportsFinanciersService.findAll();
    }

    @Get('type/:type')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les rapports par type' })
    @ApiResponse({ status: 200, description: 'Liste des rapports récupérée avec succès' })
    findByType(@Param('type') type: TypeRapportFinancier) {
        return this.rapportsFinanciersService.findByType(type);
    }

    @Get('periode')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les rapports sur une période' })
    @ApiResponse({ status: 200, description: 'Liste des rapports récupérée avec succès' })
    @ApiQuery({ name: 'debut', type: Date })
    @ApiQuery({ name: 'fin', type: Date })
    findByDateRange(
        @Query('debut') debut: Date,
        @Query('fin') fin: Date,
    ) {
        return this.rapportsFinanciersService.findByDateRange(debut, fin);
    }

    @Get('total/revenus')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer le total des revenus sur une période' })
    @ApiResponse({ status: 200, description: 'Total récupéré avec succès' })
    @ApiQuery({ name: 'debut', type: Date })
    @ApiQuery({ name: 'fin', type: Date })
    getTotalRevenus(
        @Query('debut') debut: Date,
        @Query('fin') fin: Date,
    ) {
        return this.rapportsFinanciersService.getTotalRevenus(debut, fin);
    }

    @Get('total/depenses')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer le total des dépenses sur une période' })
    @ApiResponse({ status: 200, description: 'Total récupéré avec succès' })
    @ApiQuery({ name: 'debut', type: Date })
    @ApiQuery({ name: 'fin', type: Date })
    getTotalDepenses(
        @Query('debut') debut: Date,
        @Query('fin') fin: Date,
    ) {
        return this.rapportsFinanciersService.getTotalDepenses(debut, fin);
    }

    @Get('total/benefice')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer le total des bénéfices sur une période' })
    @ApiResponse({ status: 200, description: 'Total récupéré avec succès' })
    @ApiQuery({ name: 'debut', type: Date })
    @ApiQuery({ name: 'fin', type: Date })
    getTotalBenefice(
        @Query('debut') debut: Date,
        @Query('fin') fin: Date,
    ) {
        return this.rapportsFinanciersService.getTotalBenefice(debut, fin);
    }

    @Get(':id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer un rapport par son ID' })
    @ApiResponse({ status: 200, description: 'Rapport récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Rapport non trouvé' })
    findOne(@Param('id') id: string) {
        return this.rapportsFinanciersService.findOne(+id);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer un rapport' })
    @ApiResponse({ status: 200, description: 'Rapport supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Rapport non trouvé' })
    remove(@Param('id') id: string) {
        return this.rapportsFinanciersService.remove(+id);
    }
} 