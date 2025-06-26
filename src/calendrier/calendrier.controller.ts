import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CalendrierService } from './calendrier.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEvenementCalendrierDto } from './dto/create-evenement-calendrier.dto';
import { RoleEnum } from '../users/enums/role.enum';

@ApiTags('calendrier')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('calendrier')
export class CalendrierController {
  constructor(private readonly service: CalendrierService) {}

  @Post()
  @Roles(RoleEnum.ADMIN, RoleEnum.PISCICULTEUR)
  @ApiOperation({ summary: 'Créer un événement de calendrier' })
  @ApiResponse({ status: 201, description: 'Événement créé.' })
  create(@Body() data: CreateEvenementCalendrierDto) {
    return this.service.create(data);
  }

  @Get()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Lister tous les événements' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.PISCICULTEUR)
  @ApiOperation({ summary: 'Récupérer un événement par ID' })
  findOne(@Param('id') id: number) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.PISCICULTEUR)
  @ApiOperation({ summary: 'Mettre à jour un événement' })
  update(@Param('id') id: number, @Body() data: Partial<CreateEvenementCalendrierDto>) {
    return this.service.update(Number(id), data);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.PISCICULTEUR)
  @ApiOperation({ summary: 'Supprimer un événement' })
  remove(@Param('id') id: number) {
    return this.service.remove(Number(id));
  }

  @Get('pisciculteur/:pisciculteur_id')
  @Roles(RoleEnum.ADMIN, RoleEnum.PISCICULTEUR)
  @ApiOperation({ summary: 'Lister les événements d\'un pisciculteur' })
  findByPisciculteur(@Param('pisciculteur_id') pisciculteur_id: number) {
    return this.service.findByPisciculteur(Number(pisciculteur_id));
  }
} 