import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAlimentTable1710000000004 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "aliment",
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
                        name: "type",
                        type: "enum",
                        enum: ["granule", "farine", "compose", "naturel"],
                        default: "'granule'",
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "taux_proteine",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "taux_lipide",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "taux_energie",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: "unite_mesure",
                        type: "varchar",
                        length: "20",
                    },
                    {
                        name: "stock_disponible",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        default: 0,
                    },
                    {
                        name: "seuil_alerte",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        default: 0,
                    },
                    {
                        name: "est_actif",
                        type: "boolean",
                        default: true,
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("aliment");
    }
} 