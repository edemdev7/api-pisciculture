import { IsString, IsNumber, IsNotEmpty, Min, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBassinDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsNumber()
  @Min(0)
  superficie: number;

  @IsNumber()
  @Min(1)
  capacite_max: number;

  @IsString()
  @IsNotEmpty()
  type_poisson: string;

  @IsDate()
  @Type(() => Date)
  date_creation: Date;

  @ApiProperty({ description: 'ID de la région' })
  @IsNumber()
  region_id: number;
} 