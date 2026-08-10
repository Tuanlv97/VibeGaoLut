import { Injectable, Optional, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { IQuestionRepository, QuestionFilterOptions } from '@domain/repositories/question.repository.interface';
import { Question } from '@domain/entities/question.entity';
import { QuestionOrmEntity } from '../database/entities/question.orm-entity';
import { QuestionMapper } from '../database/mappers/question.mapper';
import { SeederService } from '../database/seeds/seeder.service';

@Injectable()
export class QuestionRepository implements IQuestionRepository, OnModuleInit {
  private inMemoryQuestions: Question[] = [];

  constructor(
    private readonly seederService: SeederService,
    @Optional()
    @InjectRepository(QuestionOrmEntity)
    private readonly typeOrmRepo?: Repository<QuestionOrmEntity>,
  ) {
    if (seederService) {
      this.inMemoryQuestions = [...seederService.getQuestions()];
    }
  }

  async onModuleInit() {
    if (this.typeOrmRepo && this.seederService) {
      try {
        const count = await this.typeOrmRepo.count();
        if (count === 0) {
          const seeds = this.seederService.getQuestions();
          for (const q of seeds) {
            await this.typeOrmRepo.save(QuestionMapper.toOrm(q));
          }
        }
      } catch {
        // Fallback gracefully if DB table not ready
      }
    }
  }

  async save(question: Question): Promise<Question> {
    if (this.typeOrmRepo) {
      try {
        const orm = QuestionMapper.toOrm(question);
        const saved = await this.typeOrmRepo.save(orm);
        return QuestionMapper.toDomain(saved);
      } catch {}
    }

    const index = this.inMemoryQuestions.findIndex((q) => q.id === question.id);
    if (index >= 0) {
      this.inMemoryQuestions[index] = question;
    } else {
      this.inMemoryQuestions.push(question);
    }
    return question;
  }

  async findAll(filter?: QuestionFilterOptions): Promise<Question[]> {
    if (this.typeOrmRepo) {
      try {
        const where: FindOptionsWhere<QuestionOrmEntity> = {};

        if (filter?.status) {
          where.status = filter.status;
        }

        if (filter?.productId) {
          where.productId = filter.productId;
        }

        const list = await this.typeOrmRepo.find({
          where,
          order: { createdAt: 'DESC' },
        });

        if (list.length > 0) {
          return list.map(QuestionMapper.toDomain);
        }
      } catch {}
    }

    let result = [...this.inMemoryQuestions];

    if (filter?.status) {
      result = result.filter((q) => q.status === filter.status);
    }

    if (filter?.productId) {
      result = result.filter((q) => q.productId === filter.productId);
    }

    return result;
  }

  async findById(id: string): Promise<Question | null> {
    if (this.typeOrmRepo) {
      try {
        const found = await this.typeOrmRepo.findOne({ where: { id } });
        if (found) return QuestionMapper.toDomain(found);
      } catch {}
    }

    const found = this.inMemoryQuestions.find((q) => q.id === id);
    return found || null;
  }
}
