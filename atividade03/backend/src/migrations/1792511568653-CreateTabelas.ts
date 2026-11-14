import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTabelas1792511568653 implements MigrationInterface {
    name = 'CreateTabelas1792511568653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projetos" ("id" SERIAL NOT NULL, "nome" character varying(60) NOT NULL, "descricao" text, "cor" character varying(20) NOT NULL, CONSTRAINT "PK_fb6b6aed4b30e10b976fe8bdf5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tarefas" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descricao" text, "concluida" boolean NOT NULL DEFAULT false, "projetoId" integer, CONSTRAINT "PK_2f57a4443470e61ac5de297e30a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tarefas" ADD CONSTRAINT "FK_831dfc0f53f8ad46ae52c41e051" FOREIGN KEY ("projetoId") REFERENCES "projetos"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarefas" DROP CONSTRAINT "FK_831dfc0f53f8ad46ae52c41e051"`);
        await queryRunner.query(`DROP TABLE "tarefas"`);
        await queryRunner.query(`DROP TABLE "projetos"`);
    }

}
