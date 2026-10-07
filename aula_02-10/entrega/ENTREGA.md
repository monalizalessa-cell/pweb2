# Atividade em Casa — CRUD de Projetos (NestJS)


## O que mudou nos desafios
**1) Relacionar tarefas e projetos**
- `CreateTarefaDto`: novo campo `projetoId?` com `@IsOptional()` + `@IsInt({ message })`
  (o `UpdateTarefaDto` herda via `PartialType`).
- `Tarefa` (entity): novo campo `projetoId?`. O service salva o campo no `create`.
- Novo `dto/filtro-tarefas.dto.ts`: valida o query param (`@Type(() => Number)` + `@IsInt`).
- `GET /api/tarefas?projetoId=1` filtra as tarefas do projeto (`@Query() filtro: FiltroTarefasDto`);
  sem o parâmetro, lista todas; `?projetoId=abc` retorna 400.
- A tarefa de exemplo 1 ("Estudar NestJS") foi ligada ao projeto 1 para dar para testar o filtro.


**2) Mensagens personalizadas**
- Todos os validadores de `CreateProjetoDto` e do `projetoId` usam `{ message: '...' }`.
  A mensagem da cor lista as opções válidas.
