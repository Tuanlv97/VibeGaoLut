import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('questions')
export class QuestionOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  productId: string | null;

  @Column({ type: 'varchar', length: 255 })
  authorName: string;

  @Column({ type: 'varchar', length: 255 })
  authorEmail: string;

  @Column({ type: 'varchar', length: 50 })
  questionType: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 50, default: 'PENDING' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => QuestionAnswerOrmEntity, (answer) => answer.question, { cascade: true, eager: true })
  answers: QuestionAnswerOrmEntity[];
}

@Entity('question_answers')
export class QuestionAnswerOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  questionId: string;

  @Column({ type: 'varchar', length: 255 })
  responderName: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'boolean', default: true })
  isOfficial: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => QuestionOrmEntity, (q) => q.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'questionId' })
  question: QuestionOrmEntity;
}
