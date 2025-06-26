import { IsString, Length, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { UserStatus } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ description: 'ID de la région', required: false })
  @IsNumber()
  @IsOptional()
  region_id?: number;
} 