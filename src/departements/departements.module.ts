import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departement } from './departement.entity';
import { DepartementsService } from './departements.service';
import { DepartementsController } from './departements.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Departement])],
  providers: [DepartementsService],
  controllers: [DepartementsController],
  exports: [TypeOrmModule],
})
export class DepartementsModule {} 