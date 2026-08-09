import { Question, QuestionAnswer } from '@domain/entities/question.entity';
import { QuestionStatus, QuestionType } from '@domain/enums/question.enum';
import { IQuestionRepository } from '@domain/repositories/question.repository.interface';
import { GetQuestionsUseCase } from './get-questions.use-case';
import { CreateQuestionUseCase } from './create-question.use-case';

describe('Community Domain Use Cases', () => {
  let mockQuestionRepo: jest.Mocked<IQuestionRepository>;

  const approvedQuestion = new Question(
    'q_approved',
    'prod_1',
    'Hoang Nam',
    'nam@example.com',
    QuestionType.COOKING,
    'Nấu gạo lứt bao nhiêu phút?',
    QuestionStatus.APPROVED,
    new Date(),
    [new QuestionAnswer('a_1', 'q_approved', 'Chuyên gia Dinh dưỡng', 'Nấu 45 phút.', true)],
  );

  const pendingQuestion = new Question(
    'q_pending',
    null,
    'Minh Tu',
    'tu@example.com',
    QuestionType.NUTRITION,
    'Ăn gạo lứt có giảm cân không?',
    QuestionStatus.PENDING,
    new Date(),
    [],
  );

  beforeEach(() => {
    mockQuestionRepo = {
      save: jest.fn().mockImplementation(async (q: Question) => q),
      findAll: jest.fn().mockImplementation(async (filter?: any) => {
        if (filter?.status === QuestionStatus.APPROVED) {
          return [approvedQuestion];
        }
        return [approvedQuestion, pendingQuestion];
      }),
      findById: jest.fn(),
    };
  });

  it('GetQuestionsUseCase should force filtering by APPROVED status', async () => {
    const useCase = new GetQuestionsUseCase(mockQuestionRepo);
    const questions = await useCase.execute();

    expect(questions).toHaveLength(1);
    expect(questions[0].status).toBe(QuestionStatus.APPROVED);
    expect(mockQuestionRepo.findAll).toHaveBeenCalledWith({ status: QuestionStatus.APPROVED });
  });

  it('CreateQuestionUseCase should save guest question with status PENDING', async () => {
    const useCase = new CreateQuestionUseCase(mockQuestionRepo);
    const newQuestion = await useCase.execute({
      authorName: 'Thi Phuong',
      authorEmail: 'phuong@example.com',
      questionType: QuestionType.LIFESTYLE,
      content: 'Uống trà gạo lứt buổi tối có mất ngủ không?',
      productId: 'prod_2',
    });

    expect(newQuestion.status).toBe(QuestionStatus.PENDING);
    expect(newQuestion.authorName).toBe('Thi Phuong');
    expect(mockQuestionRepo.save).toHaveBeenCalledTimes(1);
  });
});
