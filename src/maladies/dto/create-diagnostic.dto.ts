import { IsNotEmpty, IsNumber, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StatutDiagnostic } from '../entities/diagnostic.entity';

export class CreateDiagnosticDto {
    @ApiProperty({
        description: 'ID de la maladie diagnostiquée',
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    maladie_id: number;

    @ApiProperty({
        description: 'ID du bassin concerné',
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    bassin_id: number;

    @ApiProperty({
        description: 'Date du diagnostic',
        example: '2024-03-15'
    })
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date_diagnostic: Date;

    @ApiProperty({
        description: 'Statut du diagnostic',
        enum: StatutDiagnostic,
        example: StatutDiagnostic.EN_COURS
    })
    @IsNotEmpty()
    @IsEnum(StatutDiagnostic)
    statut: StatutDiagnostic;

    @ApiProperty({
        description: 'Commentaires sur le diagnostic',
        example: 'Premiers symptômes observés ce matin',
        required: false
    })
    @IsOptional()
    @IsString()
    commentaire?: string;
} 