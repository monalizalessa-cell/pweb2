import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Cada propriedade decorada vira uma coluna da tabela "projetos".
@Entity('projetos')
export class Projeto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @Column({ length: 20 })
  cor: string;
}
