import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('regions')
@ApiBearerAuth()
@Controller('regions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une région' })
  create(@Body() body: { nom: string; departementId: number }) {
    return this.regionsService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les régions' })
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une région par ID' })
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une région' })
  update(@Param('id') id: string, @Body() body: { nom?: string; departementId?: number }) {
    return this.regionsService.update(+id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une région' })
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }

  @Get('/by-departement/:departementId')
  @ApiOperation({ summary: 'Lister les régions d\'un département' })
  findByDepartement(@Param('departementId') departementId: string) {
    return this.regionsService.findByDepartement(+departementId);
  }
} 