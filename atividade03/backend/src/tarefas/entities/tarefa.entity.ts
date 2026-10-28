import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Projeto } from '../../projetos/entities/projeto.entity';

// Cada propriedade decorada vira uma coluna da tabela "tarefas".
@Entity('tarefas')
export class Tarefa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @Column({ default: false })
  concluida: boolean;

  // Coluna "projetoId" (FK opcional). Continua aparecendo no JSON como antes.
  @Column({ type: 'int', nullable: true })
  projetoId?: number | null;

  // Relação: muitas tarefas -> um projeto. Se o projeto for apagado, a tarefa fica sem projeto.
  @ManyToOne(() => Projeto, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'projetoId' })
  projeto?: Projeto;
}
