import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
        @InjectRepository(Permission)
        private permissionsRepository: Repository<Permission>,
    ) {}

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const role = this.rolesRepository.create(createRoleDto);

        if (createRoleDto.permissionIds) {
            const permissions = await this.permissionsRepository.findByIds(createRoleDto.permissionIds);
            role.permissions = permissions;
        }

        return this.rolesRepository.save(role);
    }

    async findAll(): Promise<Role[]> {
        return this.rolesRepository.find({
            relations: ['permissions'],
            order: {
                niveau: 'DESC',
                nom: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<Role> {
        const role = await this.rolesRepository.findOne({
            where: { id },
            relations: ['permissions'],
        });

        if (!role) {
            throw new NotFoundException(`Rôle #${id} non trouvé`);
        }

        return role;
    }

    async findByCode(code: string): Promise<Role> {
        const role = await this.rolesRepository.findOne({
            where: { code },
            relations: ['permissions'],
        });

        if (!role) {
            throw new NotFoundException(`Rôle avec le code ${code} non trouvé`);
        }

        return role;
    }

    async update(id: number, updateRoleDto: CreateRoleDto): Promise<Role> {
        const role = await this.findOne(id);

        if (updateRoleDto.permissionIds) {
            const permissions = await this.permissionsRepository.findByIds(updateRoleDto.permissionIds);
            role.permissions = permissions;
        }

        Object.assign(role, updateRoleDto);
        return this.rolesRepository.save(role);
    }

    async remove(id: number): Promise<void> {
        const role = await this.findOne(id);
        await this.rolesRepository.remove(role);
    }

    async addPermission(roleId: number, permissionId: number): Promise<Role> {
        const role = await this.findOne(roleId);
        const permission = await this.permissionsRepository.findOne({ where: { id: permissionId } });

        if (!permission) {
            throw new NotFoundException(`Permission #${permissionId} non trouvée`);
        }

        if (!role.permissions) {
            role.permissions = [];
        }

        if (!role.permissions.find(p => p.id === permissionId)) {
            role.permissions.push(permission);
            return this.rolesRepository.save(role);
        }

        return role;
    }

    async removePermission(roleId: number, permissionId: number): Promise<Role> {
        const role = await this.findOne(roleId);
        
        if (role.permissions) {
            role.permissions = role.permissions.filter(p => p.id !== permissionId);
            return this.rolesRepository.save(role);
        }

        return role;
    }
} 