import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMaladiesTables1710000000008 implements MigrationInterface {
    name = 'CreateMaladiesTables1710000000008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Création de la table maladie
        await queryRunner.query(`
            CREATE TABLE "maladie" (
                "id" SERIAL NOT NULL,
                "nom" character varying(100) NOT NULL,
                "description" text NOT NULL,
                "symptomes" text NOT NULL,
                "traitements_recommandes" text NOT NULL,
                "gravite" character varying(20) NOT NULL DEFAULT 'moderee',
                "est_actif" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_maladie" PRIMARY KEY ("id")
            )
        `);

        // Création de la table diagnostic
        await queryRunner.query(`
            CREATE TABLE "diagnostic" (
                "id" SERIAL NOT NULL,
                "maladie_id" integer NOT NULL,
                "bassin_id" integer NOT NULL,
                "date_diagnostic" date NOT NULL,
                "statut" character varying(20) NOT NULL DEFAULT 'en_cours',
                "commentaire" text,
                "pisciculteur_id" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_diagnostic" PRIMARY KEY ("id")
            )
        `);

        // Création de la table traitement
        await queryRunner.query(`
            CREATE TABLE "traitement" (
                "id" SERIAL NOT NULL,
                "diagnostic_id" integer NOT NULL,
                "description" text NOT NULL,
                "date_debut" date NOT NULL,
                "date_fin" date,
                "statut" character varying(20) NOT NULL DEFAULT 'planifie',
                "resultat" text,
                "commentaire" text,
                "pisciculteur_id" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_traitement" PRIMARY KEY ("id")
            )
        `);

        // Ajout des clés étrangères pour la table diagnostic
        await queryRunner.query(`
            ALTER TABLE "diagnostic"
            ADD CONSTRAINT "FK_diagnostic_maladie"
            FOREIGN KEY ("maladie_id")
            REFERENCES "maladie"("id")
            ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "diagnostic"
            ADD CONSTRAINT "FK_diagnostic_bassin"
            FOREIGN KEY ("bassin_id")
            REFERENCES "bassin"("id")
            ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "diagnostic"
            ADD CONSTRAINT "FK_diagnostic_pisciculteur"
            FOREIGN KEY ("pisciculteur_id")
            REFERENCES "user"("id")
            ON DELETE CASCADE
        `);

        // Ajout des clés étrangères pour la table traitement
        await queryRunner.query(`
            ALTER TABLE "traitement"
            ADD CONSTRAINT "FK_traitement_diagnostic"
            FOREIGN KEY ("diagnostic_id")
            REFERENCES "diagnostic"("id")
            ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "traitement"
            ADD CONSTRAINT "FK_traitement_pisciculteur"
            FOREIGN KEY ("pisciculteur_id")
            REFERENCES "user"("id")
            ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Suppression des clés étrangères de la table traitement
        await queryRunner.query(`ALTER TABLE "traitement" DROP CONSTRAINT "FK_traitement_pisciculteur"`);
        await queryRunner.query(`ALTER TABLE "traitement" DROP CONSTRAINT "FK_traitement_diagnostic"`);

        // Suppression des clés étrangères de la table diagnostic
        await queryRunner.query(`ALTER TABLE "diagnostic" DROP CONSTRAINT "FK_diagnostic_pisciculteur"`);
        await queryRunner.query(`ALTER TABLE "diagnostic" DROP CONSTRAINT "FK_diagnostic_bassin"`);
        await queryRunner.query(`ALTER TABLE "diagnostic" DROP CONSTRAINT "FK_diagnostic_maladie"`);

        // Suppression des tables
        await queryRunner.query(`DROP TABLE "traitement"`);
        await queryRunner.query(`DROP TABLE "diagnostic"`);
        await queryRunner.query(`DROP TABLE "maladie"`);
    }
} 