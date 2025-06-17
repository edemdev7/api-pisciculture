import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Bassin } from '../../bassins/entities/bassin.entity';
import { Diagnostic } from '../../maladies/entities/diagnostic.entity';
import { Traitement } from '../../maladies/entities/traitement.entity';
import { DistributionAliment } from '../../aliments/entities/distribution-aliment.entity';
import { MouvementStockAliment } from '../../aliments/entities/mouvement-stock-aliment.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';

export enum UserStatus {
    ACTIF = 'actif',
    INACTIF = 'inactif',
    BLOQUE = 'bloque',
}

@Entity('users')
export class User {
    @ApiProperty({ description: 'Identifiant unique de l\'utilisateur' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nom d\'utilisateur unique' })
    @Column({ unique: true })
    username: string;

    @ApiProperty({ description: 'Adresse email unique' })
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @ApiProperty({ description: 'Prénom de l\'utilisateur' })
    @Column()
    prenom: string;

    @ApiProperty({ description: 'Nom de famille de l\'utilisateur' })
    @Column()
    nom: string;

    @ApiProperty({ description: 'Numéro de téléphone' })
    @Column({ nullable: true })
    telephone: string;

    @ApiProperty({ description: 'Statut de l\'utilisateur' })
    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIF
    })
    status: UserStatus;

    @ApiProperty({ description: 'Code OTP pour la vérification' })
    @Column({ nullable: true })
    otp_code: string;

    @ApiProperty({ description: 'Date d\'expiration du code OTP' })
    @Column({ nullable: true })
    otp_expire_at: Date;

    @ApiProperty({ description: 'Date de dernière connexion' })
    @Column({ nullable: true })
    derniereConnexion: Date;

    @ApiProperty({ description: 'Date de création du compte' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Date de dernière mise à jour du compte' })
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @Column({ name: 'role_id' })
    roleId: number;

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

export { Role };
