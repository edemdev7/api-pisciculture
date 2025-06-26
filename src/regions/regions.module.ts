import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './region.entity';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { Departement } from '../departements/departement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Region, Departement])],
  providers: [RegionsService],
  controllers: [RegionsController],
  exports: [TypeOrmModule],
})
export class RegionsModule {} 