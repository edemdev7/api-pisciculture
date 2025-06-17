import { IsEmail, IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../enums/role.enum';

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

    @ApiProperty({ enum: RoleEnum, example: RoleEnum.PISCICULTEUR })
    @IsEnum(RoleEnum)
    role: RoleEnum;

    @ApiProperty({ example: '+1234567890', required: false })
    @IsString()
    @IsOptional()
    telephone?: string;
} 