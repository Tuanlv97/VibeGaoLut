import { QuestionStatus, QuestionType } from '../enums/question.enum';

export class QuestionAnswer {
  constructor(
    public readonly id: string,
    public readonly questionId: string,
    public responderName: string,
    public content: string,
    public isOfficial: boolean = true,
    public readonly createdAt: Date = new Date(),
  ) {}
}

export class Question {
  constructor(
    public readonly id: string,
    public productId: string | null,
    public authorName: string,
    public authorEmail: string,
    public questionType: QuestionType,
    public content: string,
    public status: QuestionStatus = QuestionStatus.PENDING,
    public readonly createdAt: Date = new Date(),
    public answers: QuestionAnswer[] = [],
  ) {}
}
