import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BassinsModule } from './bassins/bassins.module';
import { IntrantsModule } from './intrants/intrants.module';
import { StocksModule } from './stocks/stocks.module';
import { MaladiesModule } from './maladies/maladies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule,
    AuthModule,
    BassinsModule,
    IntrantsModule,
    StocksModule,
    MaladiesModule,
  ],
})
export class AppModule {}
