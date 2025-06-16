import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateStockAlimentTable1710000000005 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "stock_aliment",
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
                        name: "quantite",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "statut",
                        type: "enum",
                        enum: ["en_stock", "epuise", "perime"],
                        default: "'en_stock'",
                    },
                    {
                        name: "date_expiration",
                        type: "date",
                        isNullable: true,
                    },
                    {
                        name: "seuil_alerte",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
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
            "stock_aliment",
            new TableForeignKey({
                columnNames: ["aliment_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "aliment",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("stock_aliment");
        if (table) {
            const foreignKeys = table.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("stock_aliment", foreignKey);
            }
        }
        await queryRunner.dropTable("stock_aliment");
    }
} 