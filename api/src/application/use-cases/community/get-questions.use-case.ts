import { IQuestionRepository, QuestionFilterOptions } from '@domain/repositories/question.repository.interface';
import { Question } from '@domain/entities/question.entity';
import { QuestionStatus } from '@domain/enums/question.enum';

export class GetQuestionsUseCase {
  constructor(private readonly questionRepository: IQuestionRepository) {}

  async execute(options?: QuestionFilterOptions): Promise<Question[]> {
    // Force status APPROVED to prevent unapproved questions from being exposed publicly
    const filterOptions: QuestionFilterOptions = {
      ...options,
      status: QuestionStatus.APPROVED,
    };
    return this.questionRepository.findAll(filterOptions);
  }
}
