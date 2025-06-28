import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PechesControleService } from '../services/peches-controle.service';
import { CreatePecheControleDto } from '../dto/create-peche-controle.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RoleEnum } from '../../users/enums/role.enum';

@ApiTags('Pêches de Contrôle')
@Controller('bassins/:bassinId/peches-controle')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PechesControleController {
    constructor(private readonly pechesControleService: PechesControleService) {}

    @Post()
    @Roles(RoleEnum.ADMIN, RoleEnum.PISCICULTEUR)
    @ApiOperation({ summary: 'Créer une nouvelle pêche de contrôle' })
    @ApiResponse({ status: 201, description: 'Pêche de contrôle créée avec succès' })
    @ApiResponse({ status: 404, description: 'Bassin ou pisciculteur non trouvé' })
    async create(
        @Param('bassinId') bassinId: number,
        @Body() createPecheDto: CreatePecheControleDto,
        @Request() req,
    ) {
        return await this.pechesControleService.create(bassinId, req.user.id, createPecheDto);
    }

    @Get()
    @Roles(RoleEnum.ADMIN, RoleEnum.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer toutes les pêches de contrôle d\'un bassin' })
    @ApiResponse({ status: 200, description: 'Liste des pêches de contrôle récupérée' })
    async findAllByBassin(@Param('bassinId') bassinId: number) {
        return await this.pechesControleService.findAllByBassin(bassinId);
    }

    @Get('statistiques')
    @Roles(RoleEnum.ADMIN, RoleEnum.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer les statistiques des pêches de contrôle d\'un bassin' })
    @ApiResponse({ status: 200, description: 'Statistiques récupérées' })
    async getStatistiques(@Param('bassinId') bassinId: number) {
        return await this.pechesControleService.getStatistiquesPecheries(bassinId);
    }

    @Get(':id')
    @Roles(RoleEnum.ADMIN, RoleEnum.PISCICULTEUR)
    @ApiOperation({ summary: 'Récupérer une pêche de contrôle spécifique' })
    @ApiResponse({ status: 200, description: 'Pêche de contrôle récupérée' })
    @ApiResponse({ status: 404, description: 'Pêche de contrôle non trouvée' })
    async findOne(@Param('id') id: number) {
        return await this.pechesControleService.findOne(id);
    }
} 