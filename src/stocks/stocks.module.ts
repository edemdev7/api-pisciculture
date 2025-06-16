import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { Stock } from './entities/stock.entity';
import { MouvementStock } from './entities/mouvement-stock.entity';
import { Intrant } from '../intrants/entities/intrant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock, MouvementStock, Intrant]),
  ],
  controllers: [StocksController],
  providers: [StocksService],
  exports: [StocksService],
})
export class StocksModule {} 