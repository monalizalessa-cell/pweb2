import dataSource from './data-source';
import { Projeto } from './projetos/entities/projeto.entity';
import { Tarefa } from './tarefas/entities/tarefa.entity';

// Popula as tabelas com dados iniciais. Rode com: npm run seed
async function seed() {
  await dataSource.initialize();

  // TRUNCATE nas duas tabelas juntas (necessário por causa da FK) e reinicia os ids.
  await dataSource.query('TRUNCATE TABLE "tarefas", "projetos" RESTART IDENTITY');

  const projetoRepo = dataSource.getRepository(Projeto);
  const tarefaRepo = dataSource.getRepository(Tarefa);

  const [faculdade] = await projetoRepo.save([
    { nome: 'Faculdade', descricao: 'Disciplinas e trabalhos do semestre', cor: 'azul' },
    { nome: 'Casa', cor: 'verde' },
  ]);

  await tarefaRepo.save([
    { titulo: 'Estudar ORM', descricao: 'TypeORM + PostgreSQL', concluida: false, projetoId: faculdade.id },
    { titulo: 'Preparar a aula de hoje', concluida: true },
  ]);

  console.log('Seed concluído!');
  await dataSource.destroy();
}

seed();
