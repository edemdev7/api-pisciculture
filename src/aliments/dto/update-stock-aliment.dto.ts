import { IsOptional, IsNumber, IsDate, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateStockAlimentDto {
    @IsOptional()
    @IsNumber()
    @Min(0)
    quantite?: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date_expiration?: Date;

    @IsOptional()
    @IsNumber()
    @Min(0)
    seuil_alerte?: number;
} 