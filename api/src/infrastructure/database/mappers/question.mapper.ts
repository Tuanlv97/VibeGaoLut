import { Question, QuestionAnswer } from '@domain/entities/question.entity';
import { QuestionStatus, QuestionType } from '@domain/enums/question.enum';
import { QuestionOrmEntity, QuestionAnswerOrmEntity } from '../entities/question.orm-entity';

export class QuestionMapper {
  static toDomain(ormEntity: QuestionOrmEntity): Question {
    const answers = (ormEntity.answers || []).map(
      (a) => new QuestionAnswer(a.id, a.questionId, a.responderName, a.content, a.isOfficial, new Date(a.createdAt)),
    );

    return new Question(
      ormEntity.id,
      ormEntity.productId,
      ormEntity.authorName,
      ormEntity.authorEmail,
      ormEntity.questionType as QuestionType,
      ormEntity.content,
      ormEntity.status as QuestionStatus,
      new Date(ormEntity.createdAt),
      answers,
    );
  }

  static toOrm(domainEntity: Question): QuestionOrmEntity {
    const ormEntity = new QuestionOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.productId = domainEntity.productId;
    ormEntity.authorName = domainEntity.authorName;
    ormEntity.authorEmail = domainEntity.authorEmail;
    ormEntity.questionType = domainEntity.questionType;
    ormEntity.content = domainEntity.content;
    ormEntity.status = domainEntity.status;
    ormEntity.createdAt = domainEntity.createdAt;

    ormEntity.answers = (domainEntity.answers || []).map((a) => {
      const answerOrm = new QuestionAnswerOrmEntity();
      answerOrm.id = a.id;
      answerOrm.questionId = a.questionId;
      answerOrm.responderName = a.responderName;
      answerOrm.content = a.content;
      answerOrm.isOfficial = a.isOfficial;
      answerOrm.createdAt = a.createdAt;
      return answerOrm;
    });

    return ormEntity;
  }
}
