import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Bassin } from '../../bassins/entities/bassin.entity';
import { Diagnostic } from '../../maladies/entities/diagnostic.entity';
import { Traitement } from '../../maladies/entities/traitement.entity';
import { DistributionAliment } from '../../aliments/entities/distribution-aliment.entity';
import { MouvementStockAliment } from '../../aliments/entities/mouvement-stock-aliment.entity';

export enum Role {
    ADMIN = 'ADMIN',
    PISCICULTEUR = 'PISCICULTEUR',
    TECHNICIEN = 'TECHNICIEN'
}

export enum UserStatus {
  ACTIF = 'ACTIF',
  INACTIF = 'INACTIF',
  SUSPENDU = 'SUSPENDU',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.PISCICULTEUR
  })
  role: Role;

  @Column({ nullable: true })
  telephone?: string;

  @Column({ default: true })
  est_actif: boolean;

  @Column({ length: 200, nullable: true })
  adresse: string;

  @Column({ default: false })
  est_verifie: boolean;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIF,
  })
  statut: UserStatus;

  @Column({ default: true })
  premiere_connexion: boolean;

  @Column({ nullable: true })
  otp_code: string;

  @Column({ type: 'timestamp', nullable: true })
  otp_expire_at: Date;

  @OneToMany(() => Bassin, bassin => bassin.pisciculteur)
  bassins: Bassin[];

  @OneToMany(() => Diagnostic, diagnostic => diagnostic.pisciculteur)
  diagnostics: Diagnostic[];

  @OneToMany(() => Traitement, traitement => traitement.pisciculteur)
  traitements: Traitement[];

  @OneToMany(() => DistributionAliment, distribution => distribution.pisciculteur)
  distributions: DistributionAliment[];

  @OneToMany(() => MouvementStockAliment, mouvement => mouvement.pisciculteur)
  mouvements: MouvementStockAliment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
} 