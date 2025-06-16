import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateDistributionAlimentTable1710000000007 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "distribution_aliment",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "aliment_id",
                        type: "int",
                    },
                    {
                        name: "bassin_id",
                        type: "int",
                    },
                    {
                        name: "quantite",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "date_prevue",
                        type: "timestamp",
                    },
                    {
                        name: "date_distribution",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "statut",
                        type: "enum",
                        enum: ["planifiee", "en_cours", "terminee", "annulee"],
                        default: "'planifiee'",
                    },
                    {
                        name: "commentaire",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "pisciculteur_id",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "distribution_aliment",
            new TableForeignKey({
                columnNames: ["aliment_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "aliment",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "distribution_aliment",
            new TableForeignKey({
                columnNames: ["bassin_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "bassin",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "distribution_aliment",
            new TableForeignKey({
                columnNames: ["pisciculteur_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("distribution_aliment");
        if (table) {
            const foreignKeys = table.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("distribution_aliment", foreignKey);
            }
        }
        await queryRunner.dropTable("distribution_aliment");
    }
} 