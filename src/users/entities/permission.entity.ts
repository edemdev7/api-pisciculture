import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission {
    @ApiProperty({ description: 'Identifiant unique de la permission' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nom unique de la permission' })
    @Column({ unique: true })
    nom: string;

    @ApiProperty({ description: 'Description de la permission' })
    @Column({ type: 'text' })
    description: string;

    @ApiProperty({ description: 'Code unique de la permission' })
    @Column({ unique: true })
    code: string;

    @ApiProperty({ description: 'Module associé à la permission' })
    @Column()
    module: string;

    @ApiProperty({ description: 'Action associée à la permission' })
    @Column()
    action: string;

    @ApiProperty({ description: 'Date de création de la permission' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Date de dernière mise à jour de la permission' })
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];
} 