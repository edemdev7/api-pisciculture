import { IsString, Length, IsNotEmpty } from 'class-validator';

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
} 