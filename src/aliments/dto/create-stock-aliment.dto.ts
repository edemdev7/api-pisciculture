import { IsNotEmpty, IsNumber, IsDate, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStockAlimentDto {
    @IsNotEmpty()
    @IsNumber()
    aliment_id: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    quantite: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date_expiration?: Date;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    seuil_alerte: number;
} 