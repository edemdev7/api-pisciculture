import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MesuresEauService } from './mesures-eau.service';
import { CreateMesureEauDto } from './dto/create-mesure-eau.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('mesures-eau')
@ApiBearerAuth()
@Controller('mesures-eau')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MesuresEauController {
    constructor(private readonly mesuresEauService: MesuresEauService) {}

    @Post()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Créer une nouvelle mesure d\'eau' })
    @ApiResponse({ status: 201, description: 'Mesure créée avec succès' })
    create(@Body() createMesureEauDto: CreateMesureEauDto) {
        return this.mesuresEauService.create(createMesureEauDto);
    }

    @Get()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer toutes les mesures d\'eau' })
    @ApiResponse({ status: 200, description: 'Liste des mesures récupérée avec succès' })
    findAll() {
        return this.mesuresEauService.findAll();
    }

    @Get('bassin/:bassinId')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les mesures d\'eau d\'un bassin' })
    @ApiResponse({ status: 200, description: 'Mesures récupérées avec succès' })
    findByBassin(@Param('bassinId') bassinId: string) {
        return this.mesuresEauService.findByBassin(+bassinId);
    }

    @Get('parametre/:parametreId')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les mesures d\'eau d\'un paramètre' })
    @ApiResponse({ status: 200, description: 'Mesures récupérées avec succès' })
    findByParametre(@Param('parametreId') parametreId: string) {
        return this.mesuresEauService.findByParametre(+parametreId);
    }

    @Get('periode')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les mesures d\'eau sur une période' })
    @ApiResponse({ status: 200, description: 'Mesures récupérées avec succès' })
    @ApiQuery({ name: 'debut', type: Date })
    @ApiQuery({ name: 'fin', type: Date })
    findByDateRange(
        @Query('debut') debut: Date,
        @Query('fin') fin: Date,
    ) {
        return this.mesuresEauService.findByDateRange(debut, fin);
    }

    @Get(':id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer une mesure d\'eau par son ID' })
    @ApiResponse({ status: 200, description: 'Mesure récupérée avec succès' })
    @ApiResponse({ status: 404, description: 'Mesure non trouvée' })
    findOne(@Param('id') id: string) {
        return this.mesuresEauService.findOne(+id);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer une mesure d\'eau' })
    @ApiResponse({ status: 200, description: 'Mesure supprimée avec succès' })
    @ApiResponse({ status: 404, description: 'Mesure non trouvée' })
    remove(@Param('id') id: string) {
        return this.mesuresEauService.remove(+id);
    }
} 