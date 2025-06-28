import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePisciculteurStatusDto {
    @ApiProperty({ description: 'Activer ou désactiver le compte du pisciculteur' })
    @IsBoolean()
    compte_actif: boolean;

    @ApiProperty({ description: 'Éligibilité au programme Soa' })
    @IsBoolean()
    @IsOptional()
    eligible_soa?: boolean;

    @ApiProperty({ description: 'Raison de la désactivation (si applicable)' })
    @IsString()
    @IsOptional()
    raison_desactivation?: string;
} 