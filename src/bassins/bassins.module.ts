import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BassinsService } from './bassins.service';
import { BassinsController } from './bassins.controller';
import { Bassin } from './entities/bassin.entity';
import { PisciculteurBassin } from './entities/pisciculteur-bassin.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bassin, PisciculteurBassin, User])
  ],
  controllers: [BassinsController],
  providers: [BassinsService],
  exports: [BassinsService, TypeOrmModule]
})
export class BassinsModule {} 