import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../entities/role.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('roles')
@ApiBearerAuth()
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Créer un nouveau rôle' })
    @ApiResponse({ status: 201, description: 'Rôle créé avec succès' })
    @ApiBody({ type: CreateRoleDto })
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get()
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Récupérer tous les rôles' })
    @ApiResponse({ status: 200, description: 'Liste des rôles récupérée avec succès' })
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Récupérer un rôle par son ID' })
    @ApiResponse({ status: 200, description: 'Rôle récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Rôle non trouvé' })
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(+id);
    }

    @Get('code/:code')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Récupérer un rôle par son code' })
    @ApiResponse({ status: 200, description: 'Rôle récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Rôle non trouvé' })
    findByCode(@Param('code') code: string) {
        return this.rolesService.findByCode(code);
    }

    @Patch(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Mettre à jour un rôle' })
    @ApiResponse({ status: 200, description: 'Rôle mis à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Rôle non trouvé' })
    update(@Param('id') id: string, @Body() updateRoleDto: CreateRoleDto) {
        return this.rolesService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Supprimer un rôle' })
    @ApiResponse({ status: 200, description: 'Rôle supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Rôle non trouvé' })
    remove(@Param('id') id: string) {
        return this.rolesService.remove(+id);
    }

    @Post(':id/permissions/:permissionId')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Ajouter une permission à un rôle' })
    @ApiResponse({ status: 200, description: 'Permission ajoutée avec succès' })
    addPermission(
        @Param('id') id: string,
        @Param('permissionId') permissionId: string,
    ) {
        return this.rolesService.addPermission(+id, +permissionId);
    }

    @Delete(':id/permissions/:permissionId')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Retirer une permission d\'un rôle' })
    @ApiResponse({ status: 200, description: 'Permission retirée avec succès' })
    removePermission(
        @Param('id') id: string,
        @Param('permissionId') permissionId: string,
    ) {
        return this.rolesService.removePermission(+id, +permissionId);
    }
} 