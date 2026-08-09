import { Injectable } from '@nestjs/common';
import { IQuestionRepository, QuestionFilterOptions } from '@domain/repositories/question.repository.interface';
import { Question } from '@domain/entities/question.entity';
import { SeederService } from '../database/seeds/seeder.service';

@Injectable()
export class QuestionRepository implements IQuestionRepository {
  private questions: Question[] = [];

  constructor(private readonly seederService: SeederService) {
    this.questions = [...seederService.getQuestions()];
  }

  async save(question: Question): Promise<Question> {
    const index = this.questions.findIndex((q) => q.id === question.id);
    if (index >= 0) {
      this.questions[index] = question;
    } else {
      this.questions.push(question);
    }
    return question;
  }

  async findAll(filter?: QuestionFilterOptions): Promise<Question[]> {
    let result = [...this.questions];

    if (filter?.status) {
      result = result.filter((q) => q.status === filter.status);
    }

    if (filter?.productId) {
      result = result.filter((q) => q.productId === filter.productId);
    }

    return result;
  }

  async findById(id: string): Promise<Question | null> {
    const found = this.questions.find((q) => q.id === id);
    return found || null;
  }
}
