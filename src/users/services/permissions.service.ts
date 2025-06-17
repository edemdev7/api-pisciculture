import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission)
        private permissionsRepository: Repository<Permission>,
    ) {}

    async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
        const permission = this.permissionsRepository.create(createPermissionDto);
        return this.permissionsRepository.save(permission);
    }

    async findAll(): Promise<Permission[]> {
        return this.permissionsRepository.find({
            order: {
                module: 'ASC',
                action: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<Permission> {
        const permission = await this.permissionsRepository.findOne({
            where: { id },
            relations: ['roles'],
        });

        if (!permission) {
            throw new NotFoundException(`Permission #${id} non trouvée`);
        }

        return permission;
    }

    async findByCode(code: string): Promise<Permission> {
        const permission = await this.permissionsRepository.findOne({
            where: { code },
            relations: ['roles'],
        });

        if (!permission) {
            throw new NotFoundException(`Permission avec le code ${code} non trouvée`);
        }

        return permission;
    }

    async findByModule(module: string): Promise<Permission[]> {
        return this.permissionsRepository.find({
            where: { module },
            order: {
                action: 'ASC',
            },
        });
    }

    async update(id: number, updatePermissionDto: CreatePermissionDto): Promise<Permission> {
        const permission = await this.findOne(id);
        Object.assign(permission, updatePermissionDto);
        return this.permissionsRepository.save(permission);
    }

    async remove(id: number): Promise<void> {
        const permission = await this.findOne(id);
        await this.permissionsRepository.remove(permission);
    }
} 