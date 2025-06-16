import { IsNumber, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class AssignPisciculteurDto {
  @IsNumber()
  @IsNotEmpty()
  pisciculteur_id: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date_affectation: Date;
} 