import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch } from '@nestjs/common';
import { ParametresEauService } from './parametres-eau.service';
import { CreateParametreEauDto } from './dto/create-parametre-eau.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('parametres-eau')
@ApiBearerAuth()
@Controller('parametres-eau')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ParametresEauController {
    constructor(private readonly parametresEauService: ParametresEauService) {}

    @Post()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Créer un nouveau paramètre d\'eau' })
    @ApiResponse({ status: 201, description: 'Paramètre créé avec succès' })
    create(@Body() createParametreEauDto: CreateParametreEauDto) {
        return this.parametresEauService.create(createParametreEauDto);
    }

    @Get()
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer tous les paramètres d\'eau' })
    @ApiResponse({ status: 200, description: 'Liste des paramètres récupérée avec succès' })
    findAll() {
        return this.parametresEauService.findAll();
    }

    @Get(':id')
    @Roles(Role.PISCICULTEUR, Role.ADMIN)
    @ApiOperation({ summary: 'Récupérer un paramètre d\'eau par son ID' })
    @ApiResponse({ status: 200, description: 'Paramètre récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Paramètre non trouvé' })
    findOne(@Param('id') id: string) {
        return this.parametresEauService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Mettre à jour un paramètre d\'eau' })
    @ApiResponse({ status: 200, description: 'Paramètre mis à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Paramètre non trouvé' })
    update(
        @Param('id') id: string,
        @Body() updateParametreEauDto: CreateParametreEauDto,
    ) {
        return this.parametresEauService.update(+id, updateParametreEauDto);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Supprimer un paramètre d\'eau' })
    @ApiResponse({ status: 200, description: 'Paramètre supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Paramètre non trouvé' })
    remove(@Param('id') id: string) {
        return this.parametresEauService.remove(+id);
    }
} 