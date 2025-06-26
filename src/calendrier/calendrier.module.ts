import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvenementCalendrier } from './entities/evenement-calendrier.entity';
import { CalendrierService } from './calendrier.service';
import { CalendrierController } from './calendrier.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EvenementCalendrier])],
  controllers: [CalendrierController],
  providers: [CalendrierService],
  exports: [CalendrierService],
})
export class CalendrierModule {} 