import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CoutsService } from './couts.service';
import { CreateCoutDto } from './dto/create-cout.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('couts')
@ApiBearerAuth()
@Controller('couts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoutsController {
    constructor(private readonly coutsService: CoutsService) {}

    @Post()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Créer un nouveau coût' })
    @ApiResponse({ status: 201, description: 'Coût créé avec succès' })
    create(@Body() createCoutDto: CreateCoutDto) {
        return this.coutsService.create(createCoutDto);
    }

    @Get()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer tous les coûts' })
    @ApiResponse({ status: 200, description: 'Liste des coûts récupérée avec succès' })
    findAll() {
        return this.coutsService.findAll();
    }

    @Get('categorie/:categorieId')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les coûts d\'une catégorie' })
    @ApiResponse({ status: 200, description: 'Liste des coûts récupérée avec succès' })
    findByCategorie(@Param('categorieId') categorieId: string) {
        return this.coutsService.findByCategorie(+categorieId);
    }

    @Get('periode')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer les coûts sur une période' })
    @ApiResponse({ status: 200, description: 'Liste des coûts récupérée avec succès' })
    @ApiQuery({ name: 'debut', type: Date })
    @ApiQuery({ name: 'fin', type: Date })
    findByDateRange(
        @Query('debut') debut: Date,
        @Query('fin') fin: Date,
    ) {
        return this.coutsService.findByDateRange(debut, fin);
    }

    @Get('total/categorie/:categorieId')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer le total des coûts d\'une catégorie' })
    @ApiResponse({ status: 200, description: 'Total récupéré avec succès' })
    getTotalByCategorie(@Param('categorieId') categorieId: string) {
        return this.coutsService.getTotalByCategorie(+categorieId);
    }

    @Get('total/periode')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer le total des coûts sur une période' })
    @ApiResponse({ status: 200, description: 'Total récupéré avec succès' })
    @ApiQuery({ name: 'debut', type: Date })
    @ApiQuery({ name: 'fin', type: Date })
    getTotalByDateRange(
        @Query('debut') debut: Date,
        @Query('fin') fin: Date,
    ) {
        return this.coutsService.getTotalByDateRange(debut, fin);
    }

    @Get(':id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer un coût par son ID' })
    @ApiResponse({ status: 200, description: 'Coût récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Coût non trouvé' })
    findOne(@Param('id') id: string) {
        return this.coutsService.findOne(+id);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer un coût' })
    @ApiResponse({ status: 200, description: 'Coût supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Coût non trouvé' })
    remove(@Param('id') id: string) {
        return this.coutsService.remove(+id);
    }
} 