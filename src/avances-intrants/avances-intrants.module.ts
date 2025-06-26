import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvanceIntrant } from './entities/avance-intrant.entity';
import { Remboursement } from './entities/remboursement.entity';
import { Dette } from './entities/dette.entity';
import { AvancesIntrantsService } from './avances-intrants.service';
import { AvancesIntrantsController } from './avances-intrants.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AvanceIntrant, Remboursement, Dette])],
  controllers: [AvancesIntrantsController],
  providers: [AvancesIntrantsService],
  exports: [AvancesIntrantsService],
})
export class AvancesIntrantsModule {} 