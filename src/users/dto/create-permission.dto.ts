import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
    @ApiProperty({ description: 'Nom unique de la permission' })
    @IsString()
    @IsNotEmpty()
    nom: string;

    @ApiProperty({ description: 'Description de la permission' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Code unique de la permission' })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: 'Module associé à la permission' })
    @IsString()
    @IsNotEmpty()
    module: string;

    @ApiProperty({ description: 'Action associée à la permission' })
    @IsString()
    @IsNotEmpty()
    action: string;
} 