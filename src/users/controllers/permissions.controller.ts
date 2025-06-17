import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch, Query } from '@nestjs/common';
import { PermissionsService } from '../services/permissions.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('permissions')
@ApiBearerAuth()
@Controller('permissions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}

    @Post()
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Créer une nouvelle permission' })
    @ApiResponse({ status: 201, description: 'Permission créée avec succès' })
    create(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionsService.create(createPermissionDto);
    }

    @Get()
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Récupérer toutes les permissions' })
    @ApiResponse({ status: 200, description: 'Liste des permissions récupérée avec succès' })
    findAll() {
        return this.permissionsService.findAll();
    }

    @Get('module/:module')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Récupérer les permissions d\'un module' })
    @ApiResponse({ status: 200, description: 'Liste des permissions récupérée avec succès' })
    findByModule(@Param('module') module: string) {
        return this.permissionsService.findByModule(module);
    }

    @Get(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Récupérer une permission par son ID' })
    @ApiResponse({ status: 200, description: 'Permission récupérée avec succès' })
    @ApiResponse({ status: 404, description: 'Permission non trouvée' })
    findOne(@Param('id') id: string) {
        return this.permissionsService.findOne(+id);
    }

    @Get('code/:code')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Récupérer une permission par son code' })
    @ApiResponse({ status: 200, description: 'Permission récupérée avec succès' })
    @ApiResponse({ status: 404, description: 'Permission non trouvée' })
    findByCode(@Param('code') code: string) {
        return this.permissionsService.findByCode(code);
    }

    @Patch(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Mettre à jour une permission' })
    @ApiResponse({ status: 200, description: 'Permission mise à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Permission non trouvée' })
    update(@Param('id') id: string, @Body() updatePermissionDto: CreatePermissionDto) {
        return this.permissionsService.update(+id, updatePermissionDto);
    }

    @Delete(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Supprimer une permission' })
    @ApiResponse({ status: 200, description: 'Permission supprimée avec succès' })
    @ApiResponse({ status: 404, description: 'Permission non trouvée' })
    remove(@Param('id') id: string) {
        return this.permissionsService.remove(+id);
    }
} 