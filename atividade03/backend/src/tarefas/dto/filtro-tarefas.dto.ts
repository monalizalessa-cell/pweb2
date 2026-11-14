import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

// Parâmetros de query de GET /api/tarefas (ex.: ?projetoId=1).
// Query params chegam como texto; @Type(() => Number) converte antes de validar.
export class FiltroTarefasDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O projetoId deve ser um número inteiro.' })
  projetoId?: number;
}
