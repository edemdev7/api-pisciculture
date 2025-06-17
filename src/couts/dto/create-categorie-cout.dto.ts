import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategorieCoutDto {
    @ApiProperty({ description: 'Nom de la catégorie' })
    @IsString()
    @IsNotEmpty()
    nom: string;

    @ApiProperty({ description: 'Description de la catégorie' })
    @IsString()
    @IsNotEmpty()
    description: string;
} 