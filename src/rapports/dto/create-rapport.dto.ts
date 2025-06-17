import { IsEnum, IsDate, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeRapport } from '../entities/rapport.entity';

export class CreateRapportDto {
    @ApiProperty({ enum: TypeRapport, description: 'Type du rapport' })
    @IsEnum(TypeRapport)
    @IsNotEmpty()
    type: TypeRapport;

    @ApiProperty({ description: 'Date du rapport' })
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ description: 'Contenu du rapport' })
    @IsString()
    @IsNotEmpty()
    contenu: string;
} 