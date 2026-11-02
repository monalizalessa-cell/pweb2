import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1793624511284 implements MigrationInterface {
    name = 'CreateUsers1793624511284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tarefas" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descricao" text, "concluida" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_2f57a4443470e61ac5de297e30a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tarefas"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
