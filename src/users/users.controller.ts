import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

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
} 