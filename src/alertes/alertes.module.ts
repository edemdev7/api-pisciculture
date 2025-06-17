import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertesService } from './alertes.service';
import { AlertesController } from './alertes.controller';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Alerte } from './entities/alerte.entity';
import { Notification } from './entities/notification.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Alerte, Notification]),
    ],
    controllers: [AlertesController, NotificationsController],
    providers: [AlertesService, NotificationsService],
    exports: [AlertesService, NotificationsService],
})
export class AlertesModule {} 