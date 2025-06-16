import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RecoltesService } from './recoltes.service';
import { CreateRecolteDto } from './dto/create-recolte.dto';
import { UpdateRecolteDto } from './dto/update-recolte.dto';
import { CreateVenteDto } from './dto/create-vente.dto';
import { UpdateVenteDto } from './dto/update-vente.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';

@ApiTags('recoltes')
@Controller('recoltes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecoltesController {
    constructor(private readonly recoltesService: RecoltesService) {}

    // Endpoints pour les récoltes
    @Post()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Créer une nouvelle récolte' })
    @ApiResponse({ status: 201, description: 'Récolte créée avec succès' })
    create(@Body() createRecolteDto: CreateRecolteDto) {
        return this.recoltesService.create(createRecolteDto);
    }

    @Get()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer toutes les récoltes' })
    @ApiResponse({ status: 200, description: 'Liste des récoltes récupérée avec succès' })
    findAll() {
        return this.recoltesService.findAll();
    }

    @Get(':id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer une récolte par son ID' })
    @ApiResponse({ status: 200, description: 'Récolte récupérée avec succès' })
    findOne(@Param('id') id: string) {
        return this.recoltesService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour une récolte' })
    @ApiResponse({ status: 200, description: 'Récolte mise à jour avec succès' })
    update(@Param('id') id: string, @Body() updateRecolteDto: UpdateRecolteDto) {
        return this.recoltesService.update(+id, updateRecolteDto);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer une récolte' })
    @ApiResponse({ status: 200, description: 'Récolte supprimée avec succès' })
    remove(@Param('id') id: string) {
        return this.recoltesService.remove(+id);
    }

    // Endpoints pour les ventes
    @Post('ventes')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Créer une nouvelle vente' })
    @ApiResponse({ status: 201, description: 'Vente créée avec succès' })
    createVente(@Body() createVenteDto: CreateVenteDto) {
        return this.recoltesService.createVente(createVenteDto);
    }

    @Get('ventes')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer toutes les ventes' })
    @ApiResponse({ status: 200, description: 'Liste des ventes récupérée avec succès' })
    findAllVentes() {
        return this.recoltesService.findAllVentes();
    }

    @Get('ventes/:id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer une vente par son ID' })
    @ApiResponse({ status: 200, description: 'Vente récupérée avec succès' })
    findOneVente(@Param('id') id: string) {
        return this.recoltesService.findOneVente(+id);
    }

    @Patch('ventes/:id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour une vente' })
    @ApiResponse({ status: 200, description: 'Vente mise à jour avec succès' })
    updateVente(@Param('id') id: string, @Body() updateVenteDto: UpdateVenteDto) {
        return this.recoltesService.updateVente(+id, updateVenteDto);
    }

    @Delete('ventes/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer une vente' })
    @ApiResponse({ status: 200, description: 'Vente supprimée avec succès' })
    removeVente(@Param('id') id: string) {
        return this.recoltesService.removeVente(+id);
    }

    // Endpoint pour les statistiques
    @Get('statistiques/recapitulatif')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les statistiques des récoltes' })
    @ApiResponse({ status: 200, description: 'Statistiques récupérées avec succès' })
    getStatistiques() {
        return this.recoltesService.getStatistiquesRecoltes();
    }
} 