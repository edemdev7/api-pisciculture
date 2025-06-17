import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RapportsService } from './rapports.service';
import { CreateRapportDto } from './dto/create-rapport.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('rapports')
@ApiBearerAuth()
@Controller('rapports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RapportsController {
    constructor(private readonly rapportsService: RapportsService) {}

    @Post()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Créer un nouveau rapport' })
    @ApiResponse({ status: 201, description: 'Rapport créé avec succès' })
    create(@Body() createRapportDto: CreateRapportDto, @Request() req) {
        return this.rapportsService.create(createRapportDto, req.user);
    }

    @Get()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer tous les rapports' })
    @ApiResponse({ status: 200, description: 'Liste des rapports récupérée avec succès' })
    findAll() {
        return this.rapportsService.findAll();
    }

    @Get('mes-rapports')
    @Roles(Role.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer les rapports du pisciculteur connecté' })
    @ApiResponse({ status: 200, description: 'Liste des rapports récupérée avec succès' })
    findMyReports(@Request() req) {
        return this.rapportsService.findByPisciculteur(req.user.id);
    }

    @Get(':id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer un rapport par son ID' })
    @ApiResponse({ status: 200, description: 'Rapport récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Rapport non trouvé' })
    findOne(@Param('id') id: string) {
        return this.rapportsService.findOne(+id);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer un rapport' })
    @ApiResponse({ status: 200, description: 'Rapport supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Rapport non trouvé' })
    remove(@Param('id') id: string) {
        return this.rapportsService.remove(+id);
    }
} 