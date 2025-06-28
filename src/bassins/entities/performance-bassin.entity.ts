import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Bassin } from './bassin.entity';

@Entity('performances_bassin')
export class PerformanceBassin {
    @ApiProperty({ description: 'Identifiant unique de la performance' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Date de mesure de la performance' })
    @CreateDateColumn()
    date_mesure: Date;

    @ApiProperty({ description: 'Nombre total de poissons' })
    @Column({ type: 'int' })
    nombre_poissons: number;

    @ApiProperty({ description: 'Poids total en kg' })
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    poids_total: number;

    @ApiProperty({ description: 'Poids moyen par poisson en kg' })
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    poids_moyen: number;

    @ApiProperty({ description: 'Taux de mortalité en pourcentage' })
    @Column({ type: 'decimal', precision: 5, scale: 2 })
    taux_mortalite: number;

    @ApiProperty({ description: 'Taux de croissance en pourcentage' })
    @Column({ type: 'decimal', precision: 5, scale: 2 })
    taux_croissance: number;

    @ApiProperty({ description: 'Taux de conversion alimentaire' })
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    taux_conversion_alimentaire: number;

    @ApiProperty({ description: 'Observations sur la performance' })
    @Column({ type: 'text', nullable: true })
    observations: string;

    @ManyToOne(() => Bassin, bassin => bassin.performances)
    @JoinColumn({ name: 'bassin_id' })
    bassin: Bassin;

    @Column({ name: 'bassin_id' })
    bassinId: number;
} 