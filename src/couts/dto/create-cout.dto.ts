import { IsNumber, IsDate, IsString, IsOptional, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoutDto {
    @ApiProperty({ description: 'ID de la catégorie' })
    @IsNumber()
    @IsNotEmpty()
    categorie_id: number;

    @ApiProperty({ description: 'Montant du coût' })
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    montant: number;

    @ApiProperty({ description: 'Date du coût' })
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ description: 'Description du coût' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Référence de la facture', required: false })
    @IsString()
    @IsOptional()
    facture?: string;
} 