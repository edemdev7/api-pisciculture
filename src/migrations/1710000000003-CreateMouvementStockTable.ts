import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMouvementStockTable1710000000003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "mouvement_stock",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "stock_id",
                        type: "int",
                    },
                    {
                        name: "type",
                        type: "enum",
                        enum: ["entree", "sortie", "ajustement"],
                    },
                    {
                        name: "quantite",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "quantite_avant",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "quantite_apres",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "commentaire",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "utilisateur_id",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "mouvement_stock",
            new TableForeignKey({
                columnNames: ["stock_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "stock",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "mouvement_stock",
            new TableForeignKey({
                columnNames: ["utilisateur_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("mouvement_stock");
        if (table) {
            const foreignKeys = table.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("mouvement_stock", foreignKey);
            }
        }
        await queryRunner.dropTable("mouvement_stock");
    }
} 