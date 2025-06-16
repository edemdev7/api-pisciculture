import { IsString, IsNumber, IsNotEmpty, Min, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

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
} 