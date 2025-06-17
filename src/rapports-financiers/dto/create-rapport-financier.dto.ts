import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsDate, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TypeRapportFinancier } from '../entities/rapport-financier.entity';

export class CreateRapportFinancierDto {
    @ApiProperty({ 
        description: 'Type du rapport',
        enum: TypeRapportFinancier,
        example: TypeRapportFinancier.MENSUEL
    })
    @IsEnum(TypeRapportFinancier)
    type: TypeRapportFinancier;

    @ApiProperty({ description: 'Date de début de la période' })
    @Type(() => Date)
    @IsDate()
    dateDebut: Date;

    @ApiProperty({ description: 'Date de fin de la période' })
    @Type(() => Date)
    @IsDate()
    dateFin: Date;

    @ApiProperty({ description: 'Total des revenus sur la période' })
    @IsNumber()
    @Min(0)
    revenus: number;

    @ApiProperty({ description: 'Total des dépenses sur la période' })
    @IsNumber()
    @Min(0)
    depenses: number;

    @ApiProperty({ description: 'Bénéfice net sur la période' })
    @IsNumber()
    benefice: number;

    @ApiProperty({ description: 'Commentaires sur le rapport', required: false })
    @IsOptional()
    @IsString()
    commentaire?: string;
} 