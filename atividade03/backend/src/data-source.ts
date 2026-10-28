import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Projeto } from './projetos/entities/projeto.entity';
import { Tarefa } from './tarefas/entities/tarefa.entity';

// Opções de conexão usadas pela APLICAÇÃO (sem migrations).
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5433,
  username: process.env.DB_USER || 'todo',
  password: process.env.DB_PASS || 'todo',
  database: process.env.DB_NAME || 'todo',
  entities: [Projeto, Tarefa],
  synchronize: false, // usamos migrations, não auto-sync
};

// DataSource usado pela CLI do TypeORM (migration:generate / migration:run) e pelo seed.
const dataSource = new DataSource({
  ...dataSourceOptions,
  migrations: ['src/migrations/*.ts'],
});

export default dataSource;
