import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPisciculteurManagementFields1710000000013 implements MigrationInterface {
    name = 'AddPisciculteurManagementFields1710000000013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Vérifier et ajouter les nouveaux champs à la table users
        const hasCompteActif = await queryRunner.hasColumn("users", "compte_actif");
        if (!hasCompteActif) {
            await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "compte_actif" boolean NOT NULL DEFAULT false`);
        }

        const hasEligibleSoa = await queryRunner.hasColumn("users", "eligible_soa");
        if (!hasEligibleSoa) {
            await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "eligible_soa" boolean NOT NULL DEFAULT false`);
        }

        const hasDateActivation = await queryRunner.hasColumn("users", "date_activation");
        if (!hasDateActivation) {
            await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "date_activation" TIMESTAMP`);
        }

        const hasAdminActivation = await queryRunner.hasColumn("users", "admin_activation");
        if (!hasAdminActivation) {
            await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "admin_activation" character varying`);
        }

        const hasRaisonDesactivation = await queryRunner.hasColumn("users", "raison_desactivation");
        if (!hasRaisonDesactivation) {
            await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "raison_desactivation" character varying`);
        }

        // Vérifier si le type enum existe déjà
        const hasTypeActiviteEnum = await queryRunner.hasTable("type_activite_enum");
        if (!hasTypeActiviteEnum) {
            await queryRunner.query(`
                CREATE TYPE "public"."type_activite_enum" AS ENUM(
                    'connexion', 'creation_bassin', 'ajout_poisson', 'distribution_aliment',
                    'diagnostic_maladie', 'traitement', 'recolte', 'vente', 'mesure_eau',
                    'maintenance_equipement', 'autre'
                )
            `);
        }

        // Vérifier si la table activites_pisciculteur existe déjà
        const hasActivitesTable = await queryRunner.hasTable("activites_pisciculteur");
        if (!hasActivitesTable) {
            await queryRunner.query(`
                CREATE TABLE "activites_pisciculteur" (
                    "id" SERIAL NOT NULL,
                    "type" "public"."type_activite_enum" NOT NULL,
                    "description" text NOT NULL,
                    "donnees" json,
                    "ip_address" character varying,
                    "user_agent" character varying,
                    "date_activite" TIMESTAMP NOT NULL DEFAULT now(),
                    "pisciculteur_id" integer NOT NULL,
                    CONSTRAINT "PK_activites_pisciculteur" PRIMARY KEY ("id")
                )
            `);

            // Ajouter la contrainte de clé étrangère
            await queryRunner.query(`
                ALTER TABLE "activites_pisciculteur" 
                ADD CONSTRAINT "FK_activites_pisciculteur_pisciculteur" 
                FOREIGN KEY ("pisciculteur_id") REFERENCES "users"("id") 
                ON DELETE CASCADE ON UPDATE NO ACTION
            `);
        }

        // Mettre à jour le statut par défaut des utilisateurs existants (pisciculteurs)
        await queryRunner.query(`
            UPDATE "users" 
            SET "status" = 'inactif', "compte_actif" = false 
            WHERE "role_id" = (SELECT "id" FROM "roles" WHERE "code" = 'PISCICULTEUR')
            AND "compte_actif" IS NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Supprimer la contrainte de clé étrangère si elle existe
        const hasForeignKey = await queryRunner.hasColumn("activites_pisciculteur", "pisciculteur_id");
        if (hasForeignKey) {
            await queryRunner.query(`ALTER TABLE "activites_pisciculteur" DROP CONSTRAINT "FK_activites_pisciculteur_pisciculteur"`);
        }

        // Supprimer la table activites_pisciculteur si elle existe
        const hasActivitesTable = await queryRunner.hasTable("activites_pisciculteur");
        if (hasActivitesTable) {
            await queryRunner.query(`DROP TABLE "activites_pisciculteur"`);
        }

        // Supprimer le type enum s'il existe
        const hasTypeActiviteEnum = await queryRunner.hasTable("type_activite_enum");
        if (hasTypeActiviteEnum) {
            await queryRunner.query(`DROP TYPE "public"."type_activite_enum"`);
        }

        // Supprimer les colonnes ajoutées à la table users
        const hasCompteActif = await queryRunner.hasColumn("users", "compte_actif");
        if (hasCompteActif) {
            await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "compte_actif"`);
        }

        const hasEligibleSoa = await queryRunner.hasColumn("users", "eligible_soa");
        if (hasEligibleSoa) {
            await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "eligible_soa"`);
        }

        const hasDateActivation = await queryRunner.hasColumn("users", "date_activation");
        if (hasDateActivation) {
            await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "date_activation"`);
        }

        const hasAdminActivation = await queryRunner.hasColumn("users", "admin_activation");
        if (hasAdminActivation) {
            await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "admin_activation"`);
        }

        const hasRaisonDesactivation = await queryRunner.hasColumn("users", "raison_desactivation");
        if (hasRaisonDesactivation) {
            await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "raison_desactivation"`);
        }
    }
} 