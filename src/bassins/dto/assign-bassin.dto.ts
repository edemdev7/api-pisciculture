import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignBassinDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    bassin_id: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    pisciculteur_id: number;
} 