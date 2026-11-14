import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private client?: Resend;

  // Cliente criado sob demanda: sem a chave, só avisa e não envia.
  private get resend(): Resend | null {
    if (!this.client) {
      const key = process.env.RESEND_API_KEY;
      if (!key) return null;
      this.client = new Resend(key);
    }
    return this.client;
  }

  async tarefaCriada(para: string, titulo: string): Promise<void> {
    const resend = this.resend;
    if (!resend) {
      console.warn('RESEND_API_KEY não definida: e-mail não enviado.');
      return;
    }
    const tituloSeguro = titulo.replace(/[<>&]/g, '');
    const { error } = await resend.emails.send({
      from: process.env.MAIL_FROM || 'Tarefas <onboarding@resend.dev>',
      to: para,
      subject: 'Nova tarefa criada',
      html: `<p>Sua tarefa <b>${tituloSeguro}</b> foi criada.</p>`,
    });
    if (error) throw new Error(error.message);
  }
}