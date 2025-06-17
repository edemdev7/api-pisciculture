import { IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeAlerte, GraviteAlerte } from '../entities/alerte.entity';

export class CreateAlerteDto {
    @ApiProperty({ enum: TypeAlerte, description: 'Type de l\'alerte' })
    @IsEnum(TypeAlerte)
    @IsNotEmpty()
    type: TypeAlerte;

    @ApiProperty({ enum: GraviteAlerte, description: 'Gravité de l\'alerte' })
    @IsEnum(GraviteAlerte)
    @IsNotEmpty()
    gravite: GraviteAlerte;

    @ApiProperty({ description: 'Message de l\'alerte' })
    @IsString()
    @IsNotEmpty()
    message: string;
} 