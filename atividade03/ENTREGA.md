# Atividade 03 — Persistência com PostgreSQL + TypeORM (NestJS)

Os módulos **Tarefas** e **Projetos** deixaram de usar array em memória e passaram a persistir
em tabelas do PostgreSQL (container Docker), seguindo o roteiro da aula 09-10.

## Como rodar
```bash
docker compose up -d db          # PostgreSQL (porta 5432, volume pgdata)
cd backend
npm install
npm run migration:run            # cria as tabelas "projetos" e "tarefas"
npm run seed                     # dados iniciais
npm run start:dev                # API em http://localhost:3000/api
```
> **Observação:** o banco no `docker-compose.yml` usa a porta **5433** no host
> (mapeada para a 5432 do container), porque a 5432 já estava ocupada na minha máquina.
> O `data-source.ts` já usa 5433 por padrão.
Frontend (opcional): `docker compose up -d frontend` → http://localhost:5173

## O que foi feito
- **docker-compose.yml**: serviço `db` (postgres:16-alpine) com volume `pgdata`.
- **Dependências**: `@nestjs/typeorm`, `typeorm`, `pg`.
- **`src/data-source.ts`**: `dataSourceOptions` (usado pela app, sem migrations) e `DataSource` da CLI (com migrations).
- **`app.module.ts`**: `TypeOrmModule.forRoot(dataSourceOptions)`.
- **Entidades** com decorators: `Tarefa` (`tarefas`) e `Projeto` (`projetos`).
  `Tarefa.projetoId` é FK opcional para `projetos` (`ON DELETE SET NULL`).
- **Migration** `src/migrations/*-CreateTabelas.ts` (gerada com `npm run migration:generate`), com `up` e `down`.
- **Seed** `src/seed.ts`: limpa as tabelas (TRUNCATE + reinício dos ids) e insere projetos e tarefas de exemplo.
- **Services** usam `Repository` (`@InjectRepository`) e agora são assíncronos (`async/await`).
  - Tarefas e Projetos: `findAll`, `findOne` (404), `create`, `update`, `remove`.
  - `GET /api/tarefas?projetoId=` continua filtrando, agora via `where` no banco.
  - Criar/editar tarefa com `projetoId` inexistente retorna 400 ("O projeto informado não existe.").
- **Controllers**: `remove` passou a retornar a Promise do service (sem isso o 404 não chegava ao cliente).
- **UpdateTarefaDto**: `concluida` validada com `@IsOptional()` + `@IsBoolean()`.

## Teste de persistência
Criar/editar/excluir pelo Postman ou pelo frontend, reiniciar o backend (`Ctrl+C` e `npm run start:dev`)
e conferir que os dados continuam lá.
## Testes no Postman
Testei o CRUD de **Tarefas** e **Projetos**:
- `GET`, `POST`, `PUT` e `DELETE` em `/api/tarefas` e `/api/projetos`
- Filtro `GET /api/tarefas?projetoId=`
- Erro 400 ao criar tarefa com `projetoId` inexistente
- Após reiniciar o backend, os dados permaneceram no PostgreSQL