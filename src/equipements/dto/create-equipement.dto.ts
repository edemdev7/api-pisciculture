import { IsString, IsEnum, IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeEquipement, StatutEquipement } from '../entities/equipement.entity';

export class CreateEquipementDto {
    @ApiProperty({ description: 'Nom de l\'équipement' })
    @IsString()
    @IsNotEmpty()
    nom: string;

    @ApiProperty({ description: 'Type d\'équipement', enum: TypeEquipement })
    @IsEnum(TypeEquipement)
    @IsNotEmpty()
    type: TypeEquipement;

    @ApiProperty({ description: 'Description de l\'équipement' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Statut de l\'équipement', enum: StatutEquipement })
    @IsEnum(StatutEquipement)
    @IsNotEmpty()
    statut: StatutEquipement;

    @ApiProperty({ description: 'Date d\'acquisition' })
    @IsDate()
    @IsNotEmpty()
    date_acquisition: Date;

    @ApiProperty({ description: 'Date de la dernière maintenance', required: false })
    @IsDate()
    date_maintenance?: Date;
} 