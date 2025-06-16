import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateLivraisonIntrantTable1710000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "livraison_intrant",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "bassin_id",
                        type: "int",
                    },
                    {
                        name: "intrant_id",
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
                        name: "date_livree",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "statut",
                        type: "enum",
                        enum: ["en_attente", "livree", "annulee"],
                        default: "'en_attente'",
                    },
                    {
                        name: "pisciculteur_id",
                        type: "int",
                    },
                    {
                        name: "admin_id",
                        type: "int",
                    },
                    {
                        name: "commentaire",
                        type: "text",
                        isNullable: true,
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
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

        // Ajout des clés étrangères
        await queryRunner.createForeignKey(
            "livraison_intrant",
            new TableForeignKey({
                columnNames: ["bassin_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "bassin",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "livraison_intrant",
            new TableForeignKey({
                columnNames: ["intrant_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "intrant",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "livraison_intrant",
            new TableForeignKey({
                columnNames: ["pisciculteur_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "livraison_intrant",
            new TableForeignKey({
                columnNames: ["admin_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("livraison_intrant");
        if (table) {
            const foreignKeys = table.foreignKeys;
            // Suppression des clés étrangères
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("livraison_intrant", foreignKey);
            }
        }
        await queryRunner.dropTable("livraison_intrant");
    }
} 