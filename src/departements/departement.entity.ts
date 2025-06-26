import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Region } from '../regions/region.entity';

@Entity('departements')
export class Departement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nom: string;

  @OneToMany(() => Region, region => region.departement)
  regions: Region[];
} 