import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { ActivitePisciculteur } from './entities/activite-pisciculteur.entity';
import { RolesService } from './services/roles.service';
import { PermissionsService } from './services/permissions.service';
import { ActivitesService } from './services/activites.service';
import { RolesController } from './controllers/roles.controller';
import { PermissionsController } from './controllers/permissions.controller';
import { ActivitesController } from './controllers/activites.controller';
import { Region } from '../regions/region.entity';
import { RegionsModule } from '../regions/regions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission, ActivitePisciculteur, Region]),
    RegionsModule,
  ],
  controllers: [UsersController, RolesController, PermissionsController, ActivitesController],
  providers: [UsersService, RolesService, PermissionsService, ActivitesService],
  exports: [UsersService, RolesService, PermissionsService, ActivitesService]
})
export class UsersModule {} 