import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametresEauService } from './parametres-eau.service';
import { ParametresEauController } from './parametres-eau.controller';
import { MesuresEauService } from './mesures-eau.service';
import { MesuresEauController } from './mesures-eau.controller';
import { ParametreEau } from './entities/parametre-eau.entity';
import { MesureEau } from './entities/mesure-eau.entity';
import { Bassin } from '../bassins/entities/bassin.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ParametreEau, MesureEau, Bassin]),
    ],
    controllers: [ParametresEauController, MesuresEauController],
    providers: [ParametresEauService, MesuresEauService],
    exports: [ParametresEauService, MesuresEauService],
})
export class QualiteEauModule {} 