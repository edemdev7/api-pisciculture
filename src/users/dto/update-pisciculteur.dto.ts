import { IsString, Length, IsOptional, IsEnum } from 'class-validator';
import { UserStatus } from '../entities/user.entity';

export class UpdatePisciculteurDto {
  @IsString()
  @Length(10, 15)
  @IsOptional()
  telephone?: string;

  @IsString()
  @IsOptional()
  nom?: string;

  @IsString()
  @IsOptional()
  prenom?: string;

  @IsEnum(UserStatus)
  @IsOptional()
  statut?: UserStatus;
} 