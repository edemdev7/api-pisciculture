import { IsEnum, IsOptional, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { LivraisonStatus } from '../entities/livraison-intrant.entity';

export class UpdateLivraisonDto {
  @IsEnum(LivraisonStatus)
  @IsOptional()
  statut?: LivraisonStatus;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date_livree?: Date;

  @IsString()
  @IsOptional()
  commentaire?: string;
} 