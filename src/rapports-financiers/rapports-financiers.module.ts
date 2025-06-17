import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RapportsFinanciersService } from './rapports-financiers.service';
import { RapportsFinanciersController } from './rapports-financiers.controller';
import { RapportFinancier } from './entities/rapport-financier.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([RapportFinancier]),
    ],
    controllers: [RapportsFinanciersController],
    providers: [RapportsFinanciersService],
    exports: [RapportsFinanciersService],
})
export class RapportsFinanciersModule {} 