import { IsEmail, IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/role.entity';

export class CreateUserDto {
    @ApiProperty({ example: 'john.doe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'John' })
    @IsString()
    nom: string;

    @ApiProperty({ example: 'Doe' })
    @IsString()
    prenom: string;

    @ApiProperty({ enum: Role, example: Role.PISCICULTEUR })
    @IsEnum(Role)
    role: Role;

    @ApiProperty({ example: '+1234567890', required: false })
    @IsString()
    @IsOptional()
    telephone?: string;
} 