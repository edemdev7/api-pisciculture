import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesCoutService } from './categories-cout.service';
import { CategoriesCoutController } from './categories-cout.controller';
import { CoutsService } from './couts.service';
import { CoutsController } from './couts.controller';
import { CategorieCout } from './entities/categorie-cout.entity';
import { Cout } from './entities/cout.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CategorieCout, Cout]),
    ],
    controllers: [CategoriesCoutController, CoutsController],
    providers: [CategoriesCoutService, CoutsService],
    exports: [CategoriesCoutService, CoutsService],
})
export class CoutsModule {} 