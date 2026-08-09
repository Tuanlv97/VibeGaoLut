import { Question } from '../entities/question.entity';
import { QuestionStatus } from '../enums/question.enum';

export interface QuestionFilterOptions {
  status?: QuestionStatus;
  productId?: string;
}

export interface IQuestionRepository {
  save(question: Question): Promise<Question>;
  findAll(filter?: QuestionFilterOptions): Promise<Question[]>;
}
