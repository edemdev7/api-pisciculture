import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AlimentsService } from './aliments.service';
import { CreateAlimentDto } from './dto/create-aliment.dto';
import { UpdateAlimentDto } from './dto/update-aliment.dto';
import { CreateStockAlimentDto } from './dto/create-stock-aliment.dto';
import { UpdateStockAlimentDto } from './dto/update-stock-aliment.dto';
import { CreateMouvementStockAlimentDto } from './dto/create-mouvement-stock-aliment.dto';
import { CreateDistributionAlimentDto } from './dto/create-distribution-aliment.dto';
import { UpdateDistributionAlimentDto } from './dto/update-distribution-aliment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { StatutDistribution } from './entities/distribution-aliment.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('aliments')
@Controller('aliments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlimentsController {
    constructor(private readonly alimentsService: AlimentsService) {}

    // Gestion des aliments
    @Post()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Créer un nouvel aliment' })
    @ApiResponse({ status: 201, description: 'Aliment créé avec succès' })
    @ApiBody({ type: CreateAlimentDto })
    create(@Body() createAlimentDto: CreateAlimentDto) {
        return this.alimentsService.create(createAlimentDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer tous les aliments' })
    @ApiResponse({ status: 200, description: 'Liste des aliments récupérée avec succès' })
    findAll() {
        return this.alimentsService.findAll();
    }

    @Get(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer un aliment par son ID' })
    @ApiResponse({ status: 200, description: 'Aliment récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Aliment non trouvé' })
    findOne(@Param('id') id: string) {
        return this.alimentsService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour un aliment' })
    @ApiResponse({ status: 200, description: 'Aliment mis à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Aliment non trouvé' })
    update(@Param('id') id: string, @Body() updateAlimentDto: UpdateAlimentDto) {
        return this.alimentsService.update(+id, updateAlimentDto);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer un aliment' })
    @ApiResponse({ status: 200, description: 'Aliment supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Aliment non trouvé' })
    remove(@Param('id') id: string) {
        return this.alimentsService.remove(+id);
    }

    // Gestion des stocks d'aliments
    @Post('stock')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Créer un nouveau stock d\'aliment' })
    @ApiResponse({ status: 201, description: 'Stock créé avec succès' })
    @ApiBody({ type: CreateStockAlimentDto })
    createStock(@Body() createStockAlimentDto: CreateStockAlimentDto) {
        return this.alimentsService.createStock(createStockAlimentDto);
    }

    @Get('stock')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer tous les stocks d\'aliments' })
    @ApiResponse({ status: 200, description: 'Liste des stocks récupérée avec succès' })
    findAllStocks() {
        return this.alimentsService.findAllStocks();
    }

    @Get('stock/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer un stock d\'aliment par son ID' })
    @ApiResponse({ status: 200, description: 'Stock récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Stock non trouvé' })
    findOneStock(@Param('id') id: string) {
        return this.alimentsService.findOneStock(+id);
    }

    @Patch('stock/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour un stock d\'aliment' })
    @ApiResponse({ status: 200, description: 'Stock mis à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Stock non trouvé' })
    updateStock(@Param('id') id: string, @Body() updateStockAlimentDto: UpdateStockAlimentDto) {
        return this.alimentsService.updateStock(+id, updateStockAlimentDto);
    }

    @Delete('stock/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer un stock d\'aliment' })
    @ApiResponse({ status: 200, description: 'Stock supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Stock non trouvé' })
    removeStock(@Param('id') id: string) {
        return this.alimentsService.removeStock(+id);
    }

    // Gestion des mouvements de stock
    @Post('mouvements')
    @Roles(Role.ADMIN, Role.PISCICULTEUR)
    @ApiOperation({ summary: 'Créer un mouvement de stock' })
    @ApiResponse({ status: 201, description: 'Mouvement créé avec succès' })
    @ApiBody({ type: CreateMouvementStockAlimentDto })
    createMouvement(@Body() createMouvementDto: CreateMouvementStockAlimentDto, @Request() req) {
        return this.alimentsService.createMouvementStock(
            createMouvementDto.stock_id,
            createMouvementDto.type,
            createMouvementDto.quantite,
            createMouvementDto.commentaire
        );
    }

    @Get('mouvements')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer tous les mouvements de stock d\'aliments' })
    @ApiResponse({ status: 200, description: 'Liste des mouvements récupérée avec succès' })
    findAllMouvements() {
        return this.alimentsService.findAllMouvements();
    }

    @Get('mouvements/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer un mouvement de stock d\'aliment par son ID' })
    @ApiResponse({ status: 200, description: 'Mouvement récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Mouvement non trouvé' })
    findOneMouvement(@Param('id') id: string) {
        return this.alimentsService.findOneMouvement(+id);
    }

    // Gestion des distributions
    @Post('distributions')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Créer une nouvelle distribution d\'aliment' })
    @ApiResponse({ status: 201, description: 'Distribution créée avec succès' })
    @ApiBody({ type: CreateDistributionAlimentDto })
    createDistribution(@Body() createDistributionDto: CreateDistributionAlimentDto, @Request() req) {
        return this.alimentsService.createDistribution(createDistributionDto, req.user.id);
    }

    @Get('distributions')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer toutes les distributions d\'aliments' })
    @ApiResponse({ status: 200, description: 'Liste des distributions récupérée avec succès' })
    findAllDistributions() {
        return this.alimentsService.findAllDistributions();
    }

    @Get('distributions/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer une distribution d\'aliment par son ID' })
    @ApiResponse({ status: 200, description: 'Distribution récupérée avec succès' })
    @ApiResponse({ status: 404, description: 'Distribution non trouvée' })
    findOneDistribution(@Param('id') id: string) {
        return this.alimentsService.findOneDistribution(+id);
    }

    @Patch('distributions/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour une distribution d\'aliment' })
    @ApiResponse({ status: 200, description: 'Distribution mise à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Distribution non trouvée' })
    updateDistribution(@Param('id') id: string, @Body() updateDistributionDto: UpdateDistributionAlimentDto) {
        return this.alimentsService.updateDistribution(+id, updateDistributionDto);
    }

    @Delete('distributions/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer une distribution d\'aliment' })
    @ApiResponse({ status: 200, description: 'Distribution supprimée avec succès' })
    @ApiResponse({ status: 404, description: 'Distribution non trouvée' })
    removeDistribution(@Param('id') id: string) {
        return this.alimentsService.removeDistribution(+id);
    }

    @Get('bassins/:bassinId/distributions')
    @Roles(Role.ADMIN)
    getDistributionsByBassin(@Param('bassinId') bassinId: string) {
        return this.alimentsService.getDistributionsByBassin(+bassinId);
    }

    @Get('mes-distributions')
    @Roles(Role.PISCICULTEUR)
    getMyDistributions(@Request() req) {
        return this.alimentsService.getMyDistributions(req.user.id);
    }
} 