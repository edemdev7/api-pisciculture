import { IsEmail, IsString, IsEnum, IsOptional, MinLength, IsBoolean, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/user.entity';

export class UpdateUserDto {
    @ApiProperty({ description: 'Nom de l\'utilisateur', example: 'Doe', required: false })
    @IsOptional()
    @IsString()
    nom?: string;

    @ApiProperty({ description: 'Prénom de l\'utilisateur', example: 'John', required: false })
    @IsOptional()
    @IsString()
    prenom?: string;

    @ApiProperty({ description: 'Email de l\'utilisateur', example: 'john.doe@example.com', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ description: 'Mot de passe de l\'utilisateur', example: 'password123', required: false })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiProperty({ description: 'Numéro de téléphone de l\'utilisateur', example: '+1234567890', required: false })
    @IsOptional()
    @IsString()
    telephone?: string;

    @ApiProperty({ 
        description: 'Rôle de l\'utilisateur',
        enum: Role,
        example: Role.PISCICULTEUR,
        required: false 
    })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;

    @ApiProperty({ description: 'Statut d\'activation de l\'utilisateur', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    est_actif?: boolean;

    @ApiProperty({ description: 'Code OTP', example: '123456', required: false })
    @IsOptional()
    @IsString()
    otp_code?: string;

    @ApiProperty({ description: 'Date d\'expiration de l\'OTP', example: '2024-03-20T10:10:00Z', required: false })
    @IsOptional()
    @IsDate()
    otp_expire_at?: Date;
} 