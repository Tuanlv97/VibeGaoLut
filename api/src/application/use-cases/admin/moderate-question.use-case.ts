import { IQuestionRepository } from '@domain/repositories/question.repository.interface';
import { Question, QuestionAnswer } from '@domain/entities/question.entity';
import { QuestionStatus } from '@domain/enums/question.enum';
import { randomUUID } from 'crypto';

export class ModerateQuestionUseCase {
  constructor(private readonly questionRepository: IQuestionRepository) {}

  async updateStatus(questionId: string, status: QuestionStatus): Promise<Question> {
    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      throw new Error(`Question with ID ${questionId} not found.`);
    }

    question.status = status;
    return await this.questionRepository.save(question);
  }

  async answerQuestion(
    questionId: string,
    answerContent: string,
    responderName: string = 'GreenPantry Nutritionist',
    approve: boolean = true,
  ): Promise<Question> {
    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      throw new Error(`Question with ID ${questionId} not found.`);
    }

    const answer = new QuestionAnswer(
      randomUUID(),
      questionId,
      responderName,
      answerContent,
      true,
      new Date(),
    );

    question.answers.push(answer);
    if (approve) {
      question.status = QuestionStatus.APPROVED;
    }

    return await this.questionRepository.save(question);
  }
}
