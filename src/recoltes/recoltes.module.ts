import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoltesService } from './recoltes.service';
import { RecoltesController } from './recoltes.controller';
import { Recolte } from './entities/recolte.entity';
import { Vente } from './entities/vente.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Recolte, Vente]),
    ],
    controllers: [RecoltesController],
    providers: [RecoltesService],
    exports: [RecoltesService],
})
export class RecoltesModule {} 