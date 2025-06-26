import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BassinsModule } from './bassins/bassins.module';
import { AlimentsModule } from './aliments/aliments.module';
import { IntrantsModule } from './intrants/intrants.module';
import { RapportsModule } from './rapports/rapports.module';
import { AlertesModule } from './alertes/alertes.module';
import { QualiteEauModule } from './qualite-eau/qualite-eau.module';
import { EquipementsModule } from './equipements/equipements.module';
import { CoutsModule } from './couts/couts.module';
import { RapportsFinanciersModule } from './rapports-financiers/rapports-financiers.module';
import { DepartementsModule } from './departements/departements.module';
import { RegionsModule } from './regions/regions.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST', 'localhost'),
                port: +configService.get<number>('DB_PORT', 5432),
                username: configService.get('DB_USERNAME', 'postgres'),
                password: configService.get('DB_PASSWORD', 'root'),
                database: configService.get('DB_DATABASE', 'api_pisciculture'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: configService.get('NODE_ENV') !== 'production',
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UsersModule,
        BassinsModule,
        AlimentsModule,
        IntrantsModule,
        RapportsModule,
        AlertesModule,
        QualiteEauModule,
        EquipementsModule,
        CoutsModule,
        RapportsFinanciersModule,
        DepartementsModule,
        RegionsModule,
    ],
})
export class AppModule {}
