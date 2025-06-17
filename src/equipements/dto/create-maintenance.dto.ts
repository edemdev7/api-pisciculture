import { IsNumber, IsEnum, IsDate, IsString, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeMaintenance } from '../entities/maintenance.entity';

export class CreateMaintenanceDto {
    @ApiProperty({ description: 'ID de l\'équipement' })
    @IsNumber()
    @IsNotEmpty()
    equipement_id: number;

    @ApiProperty({ description: 'Type de maintenance', enum: TypeMaintenance })
    @IsEnum(TypeMaintenance)
    @IsNotEmpty()
    type: TypeMaintenance;

    @ApiProperty({ description: 'Date de la maintenance' })
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ description: 'Description de la maintenance' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Coût de la maintenance' })
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    cout: number;

    @ApiProperty({ description: 'Nom du technicien' })
    @IsString()
    @IsNotEmpty()
    technicien: string;
} 