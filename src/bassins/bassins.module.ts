import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BassinsService } from './bassins.service';
import { BassinsController } from './bassins.controller';
import { Bassin } from './entities/bassin.entity';
import { PisciculteurBassin } from './entities/pisciculteur-bassin.entity';
import { PerformanceBassin } from './entities/performance-bassin.entity';
import { PecheControle } from './entities/peche-controle.entity';
import { PerformancesService } from './services/performances.service';
import { PechesControleService } from './services/peches-controle.service';
import { PerformancesController } from './controllers/performances.controller';
import { PechesControleController } from './controllers/peches-controle.controller';
import { User } from '../users/entities/user.entity';
import { Region } from '../regions/region.entity';
import { RegionsModule } from '../regions/regions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bassin, PisciculteurBassin, PerformanceBassin, PecheControle, User, Region]),
    RegionsModule,
  ],
  controllers: [BassinsController, PerformancesController, PechesControleController],
  providers: [BassinsService, PerformancesService, PechesControleService],
  exports: [BassinsService, PerformancesService, PechesControleService, TypeOrmModule]
})
export class BassinsModule {} 