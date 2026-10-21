import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarefasController } from './tarefas.controller';
import { TarefasService } from './tarefas.service';
import { Tarefa } from './entities/tarefa.entity';
import { Projeto } from '../projetos/entities/projeto.entity';

// Um módulo agrupa um recurso: aqui, o controller e o service de "tarefas".
// Projeto também é registrado para o service conferir se o projetoId existe.
@Module({
  imports: [TypeOrmModule.forFeature([Tarefa, Projeto])],
  controllers: [TarefasController],
  providers: [TarefasService],
})
export class TarefasModule {}
