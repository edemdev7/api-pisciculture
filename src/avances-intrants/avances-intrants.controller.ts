import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { AvancesIntrantsService } from './avances-intrants.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAvanceIntrantDto } from './dto/create-avance-intrant.dto';
import { CreateRemboursementDto } from './dto/create-remboursement.dto';
import { CreateDetteDto } from './dto/create-dette.dto';
import { RoleEnum } from '../users/enums/role.enum';

@ApiTags('avances-intrants')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('avances-intrants')
export class AvancesIntrantsController {
  constructor(private readonly service: AvancesIntrantsService) {}

  // Avances
  @Post('avance')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Créer une avance sur intrant' })
  @ApiResponse({ status: 201, description: 'Avance créée.' })
  createAvance(@Body() data: CreateAvanceIntrantDto) {
    return this.service.createAvance(data);
  }
  @Get('avance')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Lister toutes les avances' })
  findAllAvances() {
    return this.service.findAllAvances();
  }
  @Get('avance/:id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Récupérer une avance par ID' })
  findOneAvance(@Param('id') id: number) {
    return this.service.findOneAvance(Number(id));
  }
  @Patch('avance/:id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Mettre à jour une avance' })
  updateAvance(@Param('id') id: number, @Body() data: Partial<CreateAvanceIntrantDto>) {
    return this.service.updateAvance(Number(id), data);
  }
  @Delete('avance/:id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Supprimer une avance' })
  removeAvance(@Param('id') id: number) {
    return this.service.removeAvance(Number(id));
  }

  // Remboursements
  @Post('remboursement')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Créer un remboursement' })
  createRemboursement(@Body() data: CreateRemboursementDto) {
    return this.service.createRemboursement(data);
  }
  @Get('remboursement')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Lister tous les remboursements' })
  findAllRemboursements() {
    return this.service.findAllRemboursements();
  }
  @Get('remboursement/:id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Récupérer un remboursement par ID' })
  findOneRemboursement(@Param('id') id: number) {
    return this.service.findOneRemboursement(Number(id));
  }
  @Patch('remboursement/:id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Mettre à jour un remboursement' })
  updateRemboursement(@Param('id') id: number, @Body() data: Partial<CreateRemboursementDto>) {
    return this.service.updateRemboursement(Number(id), data);
  }
  @Delete('remboursement/:id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Supprimer un remboursement' })
  removeRemboursement(@Param('id') id: number) {
    return this.service.removeRemboursement(Number(id));
  }

  // Dettes
  @Post('dette')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Créer une dette' })
  createDette(@Body() data: CreateDetteDto) {
    return this.service.createDette(data);
  }
  @Get('dette')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Lister toutes les dettes' })
  findAllDettes() {
    return this.service.findAllDettes();
  }
  @Get('dette/:id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Récupérer une dette par ID' })
  findOneDette(@Param('id') id: number) {
    return this.service.findOneDette(Number(id));
  }
  @Patch('dette/:id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Mettre à jour une dette' })
  updateDette(@Param('id') id: number, @Body() data: Partial<CreateDetteDto>) {
    return this.service.updateDette(Number(id), data);
  }
  @Delete('dette/:id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Supprimer une dette' })
  removeDette(@Param('id') id: number) {
    return this.service.removeDette(Number(id));
  }
} 