import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from './entities/user.entity';
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
  ) {}

  async createPisciculteur(createPisciculteurDto: CreatePisciculteurDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { telephone: createPisciculteurDto.telephone },
    });

    if (existingUser) {
      throw new ConflictException('Ce numéro de téléphone est déjà utilisé');
    }

    const user = this.usersRepository.create({
      ...createPisciculteurDto,
      role: Role.PISCICULTEUR,
      premiere_connexion: true,
    });

    return this.usersRepository.save(user);
  }

  async findAllPisciculteurs() {
    return this.usersRepository.find({
      where: { role: Role.PISCICULTEUR },
    });
  }

  async findOnePisciculteur(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id, role: Role.PISCICULTEUR },
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
    const { email, password, role } = createUserDto;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel utilisateur
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: role || Role.PISCICULTEUR
    });

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Si le mot de passe est fourni, le hasher
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Mettre à jour l'utilisateur
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async findByRole(role: Role): Promise<User[]> {
    return await this.usersRepository.find({ where: { role } });
  }
} 