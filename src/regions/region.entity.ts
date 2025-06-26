import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Departement } from '../departements/departement.entity';
import { User } from '../users/entities/user.entity';
import { Bassin } from '../bassins/entities/bassin.entity';

@Entity('regions')
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @ManyToOne(() => Departement, departement => departement.regions, { eager: true })
  departement: Departement;

  @OneToMany(() => User, user => user.region)
  users: User[];

  @OneToMany(() => Bassin, bassin => bassin.region)
  bassins: Bassin[];
} 