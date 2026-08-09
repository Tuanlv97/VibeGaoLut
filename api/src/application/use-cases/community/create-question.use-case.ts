import { IQuestionRepository } from '@domain/repositories/question.repository.interface';
import { Question } from '@domain/entities/question.entity';
import { QuestionStatus, QuestionType } from '@domain/enums/question.enum';

export interface CreateQuestionInput {
  authorName: string;
  authorEmail: string;
  questionType: QuestionType;
  content: string;
  productId?: string | null;
}

export class CreateQuestionUseCase {
  constructor(private readonly questionRepository: IQuestionRepository) {}

  async execute(input: CreateQuestionInput): Promise<Question> {
    if (!input.authorName || !input.authorEmail || !input.content) {
      throw new Error('Vui lòng điền đầy đủ Họ tên, Email và Nội dung câu hỏi.');
    }

    const questionId = `q_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const question = new Question(
      questionId,
      input.productId || null,
      input.authorName,
      input.authorEmail,
      input.questionType || QuestionType.GENERAL,
      input.content,
      QuestionStatus.PENDING,
      new Date(),
      [],
    );

    return this.questionRepository.save(question);
  }
}
