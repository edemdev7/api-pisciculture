import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePisciculteurStatusDto } from './dto/update-pisciculteur-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UserStatus } from './entities/user.entity';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
    @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès' })
    @ApiBody({ type: CreateUserDto })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
    @ApiResponse({ status: 200, description: 'Liste des utilisateurs récupérée avec succès' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
    @ApiResponse({ status: 200, description: 'Utilisateur récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
    @ApiResponse({ status: 200, description: 'Utilisateur mis à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Supprimer un utilisateur' })
    @ApiResponse({ status: 200, description: 'Utilisateur supprimé avec succès' })
    @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Get('profile')
    @ApiOperation({ summary: 'Récupérer le profil de l\'utilisateur connecté' })
    @ApiResponse({ status: 200, description: 'Profil récupéré avec succès' })
    getProfile(@Request() req) {
        return this.usersService.findOne(req.user.id);
    }

    // Endpoints spécifiques aux pisciculteurs
    @Get('pisciculteurs/all')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Récupérer tous les pisciculteurs' })
    @ApiResponse({ status: 200, description: 'Liste des pisciculteurs récupérée' })
    findAllPisciculteurs() {
        return this.usersService.findAllPisciculteurs();
    }

    @Get('pisciculteurs/status/:status')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Récupérer les pisciculteurs par statut' })
    @ApiResponse({ status: 200, description: 'Pisciculteurs récupérés par statut' })
    findPisciculteursByStatus(@Param('status') status: UserStatus) {
        return this.usersService.findPisciculteursByStatus(status);
    }

    @Get('pisciculteurs/eligibles-soa')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Récupérer les pisciculteurs éligibles au programme Soa' })
    @ApiResponse({ status: 200, description: 'Pisciculteurs éligibles Soa récupérés' })
    findPisciculteursEligiblesSoa() {
        return this.usersService.findPisciculteursEligiblesSoa();
    }

    @Get('pisciculteurs/:id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Récupérer un pisciculteur par son ID' })
    @ApiResponse({ status: 200, description: 'Pisciculteur récupéré avec succès' })
    @ApiResponse({ status: 404, description: 'Pisciculteur non trouvé' })
    findOnePisciculteur(@Param('id') id: string) {
        return this.usersService.findOnePisciculteur(+id);
    }

    @Patch('pisciculteurs/:id/status')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Activer/désactiver un pisciculteur et gérer son éligibilité Soa' })
    @ApiResponse({ status: 200, description: 'Statut du pisciculteur mis à jour avec succès' })
    @ApiResponse({ status: 404, description: 'Pisciculteur non trouvé' })
    updatePisciculteurStatus(
        @Param('id') id: string,
        @Body() updateStatusDto: UpdatePisciculteurStatusDto,
        @Request() req
    ) {
        return this.usersService.updatePisciculteurStatus(+id, updateStatusDto, req.user.username);
    }
} 