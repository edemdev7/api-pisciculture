import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaladiesService } from './maladies.service';
import { MaladiesController } from './maladies.controller';
import { Maladie } from './entities/maladie.entity';
import { Diagnostic } from './entities/diagnostic.entity';
import { Traitement } from './entities/traitement.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Maladie, Diagnostic, Traitement]),
    ],
    controllers: [MaladiesController],
    providers: [MaladiesService],
    exports: [MaladiesService],
})
export class MaladiesModule {} 