import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipementsService } from './equipements.service';
import { EquipementsController } from './equipements.controller';
import { MaintenancesService } from './maintenances.service';
import { MaintenancesController } from './maintenances.controller';
import { Equipement } from './entities/equipement.entity';
import { Maintenance } from './entities/maintenance.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Equipement, Maintenance]),
    ],
    controllers: [EquipementsController, MaintenancesController],
    providers: [EquipementsService, MaintenancesService],
    exports: [EquipementsService, MaintenancesService],
})
export class EquipementsModule {} 