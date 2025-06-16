import { IsNotEmpty, IsNumber, IsEnum, Min, IsOptional, IsString } from 'class-validator';
import { TypeMouvement } from '../entities/mouvement-stock-aliment.entity';

export class CreateMouvementStockAlimentDto {
    @IsNotEmpty()
    @IsNumber()
    stock_id: number;

    @IsNotEmpty()
    @IsEnum(TypeMouvement)
    type: TypeMouvement;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    quantite: number;

    @IsOptional()
    @IsString()
    commentaire?: string;
} 