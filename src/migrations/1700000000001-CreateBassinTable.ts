import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBassinTable1700000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "bassin",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "nom",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "surface",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "volume",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "type",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "pisciculteur_id",
                        type: "int",
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

        await queryRunner.createForeignKey(
            "bassin",
            new TableForeignKey({
                columnNames: ["pisciculteur_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("bassin");
        if (table) {
            const foreignKeys = table.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("bassin", foreignKey);
            }
        }
        await queryRunner.dropTable("bassin");
    }
} 