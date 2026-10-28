import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { FiltroTarefasDto } from './dto/filtro-tarefas.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { TarefasService } from './tarefas.service';

// @Controller('tarefas') + prefixo global 'api' => rotas em /api/tarefas.
@Controller('tarefas')
export class TarefasController {
  // Injeção de dependência: o Nest entrega uma instância de TarefasService.
  constructor(private readonly tarefasService: TarefasService) {}

  @Get()
  // GET /api/tarefas?projetoId=1  (o filtro é opcional)
  findAll(@Query() filtro: FiltroTarefasDto) {
    return this.tarefasService.findAll(filtro.projetoId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tarefasService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTarefaDto) {
    return this.tarefasService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTarefaDto,
  ) {
    return this.tarefasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204) // 204 No Content: sucesso sem corpo na resposta
  remove(@Param('id', ParseIntPipe) id: number) {
    this.tarefasService.remove(id);
  }
}
