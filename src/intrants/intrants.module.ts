import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntrantsService } from './intrants.service';
import { IntrantsController } from './intrants.controller';
import { Intrant } from './entities/intrant.entity';
import { LivraisonIntrant } from './entities/livraison-intrant.entity';
import { Bassin } from '../bassins/entities/bassin.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Intrant, LivraisonIntrant, Bassin, User]),
  ],
  controllers: [IntrantsController],
  providers: [IntrantsService],
  exports: [IntrantsService],
})
export class IntrantsModule {} 