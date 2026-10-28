import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

// Cores permitidas. Fica em uma constante para ser reaproveitada (e exibida na mensagem de erro).
export const CORES_PROJETO = ['vermelho', 'verde', 'azul', 'amarelo', 'roxo'];

export class CreateProjetoDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(3, { message: 'O nome deve ter ao menos 3 caracteres.' })
  @MaxLength(60, { message: 'O nome deve ter no máximo 60 caracteres.' })
  nome: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser um texto.' })
  @MaxLength(200, { message: 'A descrição deve ter no máximo 200 caracteres.' })
  descricao?: string;

  // @IsIn confere se o valor está dentro da lista informada.
  @IsIn(CORES_PROJETO, {
    message: `A cor deve ser uma destas: ${CORES_PROJETO.join(', ')}.`,
  })
  cor: string;
}
