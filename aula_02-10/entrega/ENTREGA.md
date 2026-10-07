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

**2) Frontend**
- `App.jsx` virou um container com duas abas; o código antigo foi para `Tarefas.jsx`.
- Novo `Projetos.jsx`: lista, cria (nome, descrição, cor), edita o nome (clique) e exclui;
  mostra os erros de validação do backend.
- `Tarefas.jsx`: seletor de projeto no formulário, filtro por projeto (usa `?projetoId=`)
  e etiqueta colorida com o nome do projeto em cada tarefa.
- `api.js`: funções de projetos + mapa de cores; `styles.css`: estilos de abas, chip e bolinha de cor.
- main.ts: habilitei o ValidationPipe global (whitelist, forbidNonWhitelisted e transform),
  que estava comentado no backend-inicial. Sem ele os DTOs não validavam.

**3) Mensagens personalizadas**
- Todos os validadores de `CreateProjetoDto` e do `projetoId` usam `{ message: '...' }`.
  A mensagem da cor lista as opções válidas.
