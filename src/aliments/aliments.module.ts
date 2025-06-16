import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlimentsService } from './aliments.service';
import { AlimentsController } from './aliments.controller';
import { Aliment } from './entities/aliment.entity';
import { StockAliment } from './entities/stock-aliment.entity';
import { MouvementStockAliment } from './entities/mouvement-stock-aliment.entity';
import { DistributionAliment } from './entities/distribution-aliment.entity';
import { BassinsModule } from '../bassins/bassins.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Aliment,
            StockAliment,
            MouvementStockAliment,
            DistributionAliment
        ]),
        BassinsModule,
        UsersModule
    ],
    controllers: [AlimentsController],
    providers: [AlimentsService],
    exports: [AlimentsService]
})
export class AlimentsModule {} 