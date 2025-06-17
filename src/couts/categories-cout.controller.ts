import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch } from '@nestjs/common';
import { CategoriesCoutService } from './categories-cout.service';
import { CreateCategorieCoutDto } from './dto/create-categorie-cout.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('categories-cout')
@ApiBearerAuth()
@Controller('categories-cout')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesCoutController {
    constructor(private readonly categoriesCoutService: CategoriesCoutService) {}

    @Post()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Créer une nouvelle catégorie de coût' })
    @ApiResponse({ status: 201, description: 'Catégorie créée avec succès' })
    create(@Body() createCategorieCoutDto: CreateCategorieCoutDto) {
        return this.categoriesCoutService.create(createCategorieCoutDto);
    }

    @Get()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer toutes les catégories de coût' })
    @ApiResponse({ status: 200, description: 'Liste des catégories récupérée avec succès' })
    findAll() {
        return this.categoriesCoutService.findAll();
    }

    @Get(':id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer une catégorie de coût par son ID' })
    @ApiResponse({ status: 200, description: 'Catégorie récupérée avec succès' })
    @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
    findOne(@Param('id') id: string) {
        return this.categoriesCoutService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour une catégorie de coût' })
    @ApiResponse({ status: 200, description: 'Catégorie mise à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
    update(
        @Param('id') id: string,
        @Body() updateCategorieCoutDto: CreateCategorieCoutDto,
    ) {
        return this.categoriesCoutService.update(+id, updateCategorieCoutDto);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer une catégorie de coût' })
    @ApiResponse({ status: 200, description: 'Catégorie supprimée avec succès' })
    @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
    remove(@Param('id') id: string) {
        return this.categoriesCoutService.remove(+id);
    }
} 