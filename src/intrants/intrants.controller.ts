import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { IntrantsService } from './intrants.service';
import { CreateIntrantDto } from './dto/create-intrant.dto';
import { UpdateIntrantDto } from './dto/update-intrant.dto';
import { CreateLivraisonDto } from './dto/create-livraison.dto';
import { UpdateLivraisonDto } from './dto/update-livraison.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('intrants')
@Controller('intrants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IntrantsController {
  constructor(private readonly intrantsService: IntrantsService) {}

  // Gestion des intrants (ADMIN)
  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Créer un nouvel intrant' })
  @ApiResponse({ status: 201, description: 'Intrant créé avec succès' })
  @ApiBody({ type: CreateIntrantDto })
  create(@Body() createIntrantDto: CreateIntrantDto) {
    return this.intrantsService.create(createIntrantDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Récupérer tous les intrants' })
  @ApiResponse({ status: 200, description: 'Liste des intrants récupérée avec succès' })
  findAll() {
    return this.intrantsService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Récupérer un intrant par son ID' })
  @ApiResponse({ status: 200, description: 'Intrant récupéré avec succès' })
  @ApiResponse({ status: 404, description: 'Intrant non trouvé' })
  findOne(@Param('id') id: string) {
    return this.intrantsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Mettre à jour un intrant' })
  @ApiResponse({ status: 200, description: 'Intrant mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Intrant non trouvé' })
  update(@Param('id') id: string, @Body() updateIntrantDto: UpdateIntrantDto) {
    return this.intrantsService.update(+id, updateIntrantDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Supprimer un intrant' })
  @ApiResponse({ status: 200, description: 'Intrant supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Intrant non trouvé' })
  remove(@Param('id') id: string) {
    return this.intrantsService.remove(+id);
  }

  // Gestion des livraisons (ADMIN)
  @Post('livraisons')
  @Roles(Role.ADMIN)
  @ApiBody({ type: CreateLivraisonDto })
  createLivraison(@Body() createLivraisonDto: CreateLivraisonDto, @Request() req) {
    return this.intrantsService.createLivraison(createLivraisonDto, req.user.id);
  }

  @Get('livraisons')
  @Roles(Role.ADMIN)
  findAllLivraisons() {
    return this.intrantsService.findAllLivraisons();
  }

  @Get('livraisons/:id')
  @Roles(Role.ADMIN)
  findOneLivraison(@Param('id') id: string) {
    return this.intrantsService.findOneLivraison(+id);
  }

  @Put('livraisons/:id')
  @Roles(Role.ADMIN)
  updateLivraison(@Param('id') id: string, @Body() updateLivraisonDto: UpdateLivraisonDto) {
    return this.intrantsService.updateLivraison(+id, updateLivraisonDto);
  }

  @Get('livraisons/bassin/:bassinId')
  @Roles(Role.ADMIN)
  getLivraisonsByBassin(@Param('bassinId') bassinId: string) {
    return this.intrantsService.getLivraisonsByBassin(+bassinId);
  }

  // Endpoints pour les pisciculteurs
  @Get('my-livraisons')
  @Roles(Role.PISCICULTEUR)
  getMyLivraisons(@Request() req) {
    return this.intrantsService.getMyLivraisons(req.user.id);
  }
} 