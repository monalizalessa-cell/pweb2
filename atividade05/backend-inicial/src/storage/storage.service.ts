import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { extname } from 'path';

@Injectable()
export class StorageService {
  private client?: SupabaseClient;

  // O cliente é criado sob demanda: sem as chaves no .env, só falha ao usar.
  private get supabase(): SupabaseClient {
    if (!this.client) {
      const url = process.env.SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_KEY;
      if (!url || !key) {
        throw new InternalServerErrorException(
          'Supabase não configurado: defina SUPABASE_URL e SUPABASE_SERVICE_KEY no .env',
        );
      }
      this.client = createClient(url, key);
    }
    return this.client;
  }

  private get bucket(): string {
    return process.env.SUPABASE_BUCKET || 'anexos';
  }

  async enviar(arquivo: Express.Multer.File): Promise<string> {
    // Nome aleatório: não confiamos no nome original (só na extensão).
    const caminho = `tarefas/${randomUUID()}${extname(arquivo.originalname)}`;
    const { error } = await this.supabase.storage
      .from(this.bucket)
      .upload(caminho, arquivo.buffer, { contentType: arquivo.mimetype });
    if (error) throw new InternalServerErrorException(error.message);

    const { data } = this.supabase.storage
      .from(this.bucket)
      .getPublicUrl(caminho);
    return data.publicUrl;
  }
}