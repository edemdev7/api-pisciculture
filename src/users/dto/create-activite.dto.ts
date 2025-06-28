import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional, IsObject } from 'class-validator';
import { TypeActivite } from '../entities/activite-pisciculteur.entity';

export class CreateActiviteDto {
    @ApiProperty({ description: 'Type d\'activité effectuée', enum: TypeActivite })
    @IsEnum(TypeActivite)
    type: TypeActivite;

    @ApiProperty({ description: 'Description détaillée de l\'activité' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'Données supplémentaires de l\'activité (JSON)', required: false })
    @IsObject()
    @IsOptional()
    donnees?: any;

    @ApiProperty({ description: 'Adresse IP de l\'utilisateur', required: false })
    @IsString()
    @IsOptional()
    ip_address?: string;

    @ApiProperty({ description: 'User agent du navigateur', required: false })
    @IsString()
    @IsOptional()
    user_agent?: string;
} 