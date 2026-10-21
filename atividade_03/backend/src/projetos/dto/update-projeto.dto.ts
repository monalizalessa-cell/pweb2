import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetoDto } from './create-projeto.dto';

// PartialType deixa todos os campos opcionais, reaproveitando as validações.
export class UpdateProjetoDto extends PartialType(CreateProjetoDto) {}
