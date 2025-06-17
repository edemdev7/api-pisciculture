import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { CreatePisciculteurDto } from './dto/create-pisciculteur.dto';
import { UpdatePisciculteurDto } from './dto/update-pisciculteur.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

    async createPisciculteur(createPisciculteurDto: CreatePisciculteurDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { telephone: createPisciculteurDto.telephone },
        });

        if (existingUser) {
            throw new ConflictException('Ce numéro de téléphone est déjà utilisé');
        }

        const role = await this.rolesRepository.findOne({ where: { code: 'PISCICULTEUR' } });
        if (!role) {
            throw new NotFoundException('Rôle PISCICULTEUR non trouvé');
        }

        const user = this.usersRepository.create({
            ...createPisciculteurDto,
            roleId: role.id,
            status: UserStatus.ACTIF,
        });

        return this.usersRepository.save(user);
    }

    async findAllPisciculteurs() {
        const role = await this.rolesRepository.findOne({ where: { code: 'PISCICULTEUR' } });
        if (!role) {
            throw new NotFoundException('Rôle PISCICULTEUR non trouvé');
        }
        return this.usersRepository.find({
            where: { roleId: role.id },
            relations: ['role'],
        });
    }

    async findOnePisciculteur(id: number) {
        const role = await this.rolesRepository.findOne({ where: { code: 'PISCICULTEUR' } });
        if (!role) {
            throw new NotFoundException('Rôle PISCICULTEUR non trouvé');
        }
        const user = await this.usersRepository.findOne({
            where: { id, roleId: role.id },
            relations: ['role'],
        });

        if (!user) {
            throw new NotFoundException('Pisciculteur non trouvé');
        }

        return user;
    }

    async updatePisciculteur(id: number, updatePisciculteurDto: UpdatePisciculteurDto) {
        const user = await this.findOnePisciculteur(id);

        if (updatePisciculteurDto.telephone) {
            const existingUser = await this.usersRepository.findOne({
                where: { telephone: updatePisciculteurDto.telephone },
            });

            if (existingUser && existingUser.id !== id) {
                throw new ConflictException('Ce numéro de téléphone est déjà utilisé');
            }
        }

        Object.assign(user, updatePisciculteurDto);
        return this.usersRepository.save(user);
    }

    async removePisciculteur(id: number) {
        const user = await this.findOnePisciculteur(id);
        return this.usersRepository.remove(user);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, password } = createUserDto;

        const existingUser = await this.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('Un utilisateur avec cet email existe déjà');
        }

        const role = await this.rolesRepository.findOne({ 
            where: { code: createUserDto.role?.code || 'PISCICULTEUR' } 
        });
        if (!role) {
            throw new NotFoundException(`Rôle ${createUserDto.role?.code || 'PISCICULTEUR'} non trouvé`);
        }

        const user = this.usersRepository.create({
            ...createUserDto,
            roleId: role.id,
            status: UserStatus.ACTIF,
        });

        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find({
            relations: ['role'],
        });
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['role'],
        });
        if (!user) {
            throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { email },
            relations: ['role'],
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        if (updateUserDto.role?.code) {
            const role = await this.rolesRepository.findOne({
                where: { code: updateUserDto.role.code },
            });
            if (!role) {
                throw new NotFoundException(`Rôle ${updateUserDto.role.code} non trouvé`);
            }
            user.roleId = role.id;
        }

        Object.assign(user, updateUserDto);
        return this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.usersRepository.remove(user);
    }

    async findByRole(roleCode: string): Promise<User[]> {
        const role = await this.rolesRepository.findOne({ where: { code: roleCode } });
        if (!role) {
            throw new NotFoundException(`Rôle ${roleCode} non trouvé`);
        }
        return this.usersRepository.find({
            where: { roleId: role.id },
            relations: ['role'],
        });
    }
} 