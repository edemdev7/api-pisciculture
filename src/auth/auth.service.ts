import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        nom: user.nom,
        prenom: user.prenom
      }
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const { password, ...result } = user;
    return result;
  }

  async generateOTP(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpireAt = new Date();
    otpExpireAt.setMinutes(otpExpireAt.getMinutes() + 10); // OTP valide pendant 10 minutes

    await this.usersService.update(user.id, {
      otp_code: otp,
      otp_expire_at: otpExpireAt
    });

    // TODO: Envoyer l'OTP par email
    console.log(`OTP pour ${email}: ${otp}`);
  }

  async verifyOTP(email: string, otp: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    if (!user.otp_code || !user.otp_expire_at) {
      throw new BadRequestException('Aucun OTP en attente de vérification');
    }

    if (user.otp_code !== otp) {
      throw new BadRequestException('OTP invalide');
    }

    if (new Date() > user.otp_expire_at) {
      throw new BadRequestException('OTP expiré');
    }

    await this.usersService.update(user.id, {
      otp_code: '',
      otp_expire_at: undefined
    });
  }

  async resetPassword(email: string, otp: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.otp_code || !user.otp_expire_at) {
      throw new UnauthorizedException('Code OTP invalide ou expiré');
    }

    if (user.otp_code !== otp) {
      throw new UnauthorizedException('Code OTP incorrect');
    }

    if (new Date() > user.otp_expire_at) {
      throw new UnauthorizedException('Code OTP expiré');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.update(user.id, {
      password: hashedPassword,
      otp_code: '',
      otp_expire_at: undefined
    });
  }

  async refreshToken(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    if (user.status !== UserStatus.ACTIF) {
      throw new UnauthorizedException('Compte inactif ou suspendu');
    }

    const payload = { sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
      },
    };
  }

  async logout(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Mettre à jour la date de dernière déconnexion
    await this.usersRepository.update(userId, {
      derniereConnexion: new Date()
    });

    return { message: 'Déconnexion réussie' };
  }
} 