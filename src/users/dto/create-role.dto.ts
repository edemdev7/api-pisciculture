import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsArray } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({ description: 'Nom unique du rôle' })
    @IsString()
    @IsNotEmpty()
    nom: string;

    @ApiProperty({ description: 'Description du rôle' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Code unique du rôle' })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: 'Niveau de priorité du rôle' })
    @IsNumber()
    @IsOptional()
    niveau?: number;

    @ApiProperty({ description: 'Indique si le rôle est actif' })
    @IsBoolean()
    @IsOptional()
    est_actif?: boolean;

    @ApiProperty({ description: 'Liste des IDs des permissions associées au rôle' })
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    permissionIds?: number[];
} 