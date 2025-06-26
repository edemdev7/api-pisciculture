import { IsString, Length, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePisciculteurDto {
  @IsString()
  @Length(10, 15)
  @IsNotEmpty()
  telephone: string;

  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'ID de la région' })
  @IsNumber()
  region_id: number;
} 