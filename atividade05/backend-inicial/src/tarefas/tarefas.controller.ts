import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { TarefasService } from './tarefas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// @UseGuards protege TODAS as rotas: exige um token JWT válido no cookie.
@UseGuards(JwtAuthGuard)
@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Get()
  findAll() {
    return this.tarefasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tarefasService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTarefaDto, @Req() req: Request) {
    // O e-mail vem do token JWT (validado pelo guard), não do cliente.
    const user = req.user as { userId: number; email: string };
    return this.tarefasService.create(dto, user.email);
  }

  @Post(':id/anexo')
  @UseInterceptors(FileInterceptor('arquivo'))
  anexar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /^(image\/(png|jpe?g|webp|gif)|application\/pdf)$/,
          }),
        ],
      }),
    )
    arquivo: Express.Multer.File,
  ) {
    return this.tarefasService.anexar(id, arquivo);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTarefaDto) {
    return this.tarefasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    this.tarefasService.remove(id);
  }
}