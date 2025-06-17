import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RapportsService } from './rapports.service';
import { RapportsController } from './rapports.controller';
import { StatistiquesService } from './statistiques.service';
import { StatistiquesController } from './statistiques.controller';
import { Rapport } from './entities/rapport.entity';
import { Statistique } from './entities/statistique.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Rapport, Statistique]),
    ],
    controllers: [RapportsController, StatistiquesController],
    providers: [RapportsService, StatistiquesService],
    exports: [RapportsService, StatistiquesService],
})
export class RapportsModule {} 