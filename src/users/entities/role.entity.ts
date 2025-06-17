import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity('roles')
export class Role {
    static ADMIN: Role;
    users: any;
    static PISCICULTEUR(PISCICULTEUR: any, ADMIN: (PISCICULTEUR: unknown, ADMIN: any) => (target: import("../../alertes/notifications.controller").NotificationsController, propertyKey: "findAll", descriptor: TypedPropertyDescriptor<(req: any) => Promise<import("../../alertes/entities/notification.entity").Notification[]>>) => void | TypedPropertyDescriptor<any>): (target: import("../../alertes/notifications.controller").NotificationsController, propertyKey: "findAll", descriptor: TypedPropertyDescriptor<(req: any) => Promise<import("../../alertes/entities/notification.entity").Notification[]>>) => void | TypedPropertyDescriptor<...> {
        throw new Error('Method not implemented.');
    }
    static ADMIN(PISCICULTEUR: unknown, ADMIN: any): (target: import("../../alertes/notifications.controller").NotificationsController, propertyKey: "findAll", descriptor: TypedPropertyDescriptor<(req: any) => Promise<import("../../alertes/entities/notification.entity").Notification[]>>) => void | TypedPropertyDescriptor<...> {
        throw new Error('Method not implemented.');
    }
    @ApiProperty({ description: 'Identifiant unique du rôle' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Nom unique du rôle' })
    @Column({ unique: true })
    nom: string;

    @ApiProperty({ description: 'Description du rôle' })
    @Column({ type: 'text' })
    description: string;

    @ApiProperty({ description: 'Code unique du rôle' })
    @Column({ unique: true })
    code: string;

    @ApiProperty({ description: 'Niveau de priorité du rôle' })
    @Column({ default: 0 })
    niveau: number;

    @ApiProperty({ description: 'Indique si le rôle est actif' })
    @Column({ default: true })
    est_actif: boolean;

    @ApiProperty({ description: 'Date de création du rôle' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Date de dernière mise à jour du rôle' })
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable({
        name: 'roles_permissions',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    })
    permissions: Permission[];

    @OneToMany(() => User, user => user.role)
    users: User[];
    static PISCICULTEUR: unknown;
} 