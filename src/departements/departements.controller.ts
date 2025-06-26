import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { DepartementsService } from './departements.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('departements')
@ApiBearerAuth()
@Controller('departements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DepartementsController {
  constructor(private readonly departementsService: DepartementsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un département' })
  create(@Body() body: { nom: string }) {
    return this.departementsService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les départements' })
  findAll() {
    return this.departementsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un département par ID' })
  findOne(@Param('id') id: string) {
    return this.departementsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un département' })
  update(@Param('id') id: string, @Body() body: { nom?: string }) {
    return this.departementsService.update(+id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un département' })
  remove(@Param('id') id: string) {
    return this.departementsService.remove(+id);
  }
} 