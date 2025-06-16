import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { CreateMouvementDto } from './dto/create-mouvement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('stocks')
@Controller('stocks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Créer un nouveau stock' })
  @ApiResponse({ status: 201, description: 'Stock créé avec succès' })
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Récupérer tous les stocks' })
  @ApiResponse({ status: 200, description: 'Liste des stocks récupérée avec succès' })
  findAll() {
    return this.stocksService.findAll();
  }

  @Get('alertes')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Récupérer les stocks en alerte' })
  @ApiResponse({ status: 200, description: 'Liste des stocks en alerte récupérée avec succès' })
  getStocksAlertes() {
    return this.stocksService.getStocksAlertes();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Récupérer un stock par son ID' })
  @ApiResponse({ status: 200, description: 'Stock récupéré avec succès' })
  @ApiResponse({ status: 404, description: 'Stock non trouvé' })
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Mettre à jour un stock' })
  @ApiResponse({ status: 200, description: 'Stock mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Stock non trouvé' })
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(+id, updateStockDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Supprimer un stock' })
  @ApiResponse({ status: 200, description: 'Stock supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Stock non trouvé' })
  remove(@Param('id') id: string) {
    return this.stocksService.remove(+id);
  }

  @Post('mouvements')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Créer un mouvement de stock' })
  @ApiResponse({ status: 201, description: 'Mouvement créé avec succès' })
  @ApiResponse({ status: 400, description: 'Quantité insuffisante en stock' })
  createMouvement(@Body() createMouvementDto: CreateMouvementDto, @Request() req) {
    return this.stocksService.createMouvement(createMouvementDto, req.user.id);
  }

  @Get(':id/mouvements')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Récupérer les mouvements d\'un stock' })
  @ApiResponse({ status: 200, description: 'Liste des mouvements récupérée avec succès' })
  getMouvements(@Param('id') id: string) {
    return this.stocksService.getMouvements(+id);
  }
} 