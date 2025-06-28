import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBassinManagementFeatures1710000000014 implements MigrationInterface {
    name = 'AddBassinManagementFeatures1710000000014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Créer la table performances_bassin
        await queryRunner.query(`
            CREATE TABLE "performances_bassin" (
                "id" SERIAL NOT NULL,
                "date_mesure" TIMESTAMP NOT NULL DEFAULT now(),
                "nombre_poissons" integer NOT NULL,
                "poids_total" decimal(10,2) NOT NULL,
                "poids_moyen" decimal(10,2) NOT NULL,
                "taux_mortalite" decimal(5,2) NOT NULL,
                "taux_croissance" decimal(5,2) NOT NULL,
                "taux_conversion_alimentaire" decimal(5,2),
                "observations" text,
                "bassin_id" integer NOT NULL,
                CONSTRAINT "PK_performances_bassin" PRIMARY KEY ("id")
            )
        `);

        // Créer la table peches_controle
        await queryRunner.query(`
            CREATE TABLE "peches_controle" (
                "id" SERIAL NOT NULL,
                "date_peche" TIMESTAMP NOT NULL DEFAULT now(),
                "nombre_poissons_peches" integer NOT NULL,
                "poids_total_peche" decimal(10,2) NOT NULL,
                "poids_moyen_poisson" decimal(10,2) NOT NULL,
                "taille_moyenne" decimal(5,2),
                "etat_sante" character varying(50),
                "observations" text,
                "methode_peche" character varying(100),
                "bassin_id" integer NOT NULL,
                "pisciculteur_id" integer NOT NULL,
                CONSTRAINT "PK_peches_controle" PRIMARY KEY ("id")
            )
        `);

        // Ajouter les contraintes de clé étrangère
        await queryRunner.query(`
            ALTER TABLE "performances_bassin" 
            ADD CONSTRAINT "FK_performances_bassin_bassin" 
            FOREIGN KEY ("bassin_id") REFERENCES "bassins"("id") 
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "peches_controle" 
            ADD CONSTRAINT "FK_peches_controle_bassin" 
            FOREIGN KEY ("bassin_id") REFERENCES "bassins"("id") 
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "peches_controle" 
            ADD CONSTRAINT "FK_peches_controle_pisciculteur" 
            FOREIGN KEY ("pisciculteur_id") REFERENCES "users"("id") 
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Supprimer les contraintes de clé étrangère
        await queryRunner.query(`ALTER TABLE "peches_controle" DROP CONSTRAINT "FK_peches_controle_pisciculteur"`);
        await queryRunner.query(`ALTER TABLE "peches_controle" DROP CONSTRAINT "FK_peches_controle_bassin"`);
        await queryRunner.query(`ALTER TABLE "performances_bassin" DROP CONSTRAINT "FK_performances_bassin_bassin"`);

        // Supprimer les tables
        await queryRunner.query(`DROP TABLE "peches_controle"`);
        await queryRunner.query(`DROP TABLE "performances_bassin"`);
    }
} 