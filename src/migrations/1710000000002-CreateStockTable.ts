import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateStockTable1710000000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "stock",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
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
                        name: "date_expiration",
                        type: "date",
                        isNullable: true,
                    },
                    {
                        name: "statut",
                        type: "enum",
                        enum: ["en_stock", "epuise", "perime"],
                        default: "'en_stock'",
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
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "stock",
            new TableForeignKey({
                columnNames: ["intrant_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "intrant",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("stock");
        if (table) {
            const foreignKeys = table.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("stock", foreignKey);
            }
        }
        await queryRunner.dropTable("stock");
    }
} 