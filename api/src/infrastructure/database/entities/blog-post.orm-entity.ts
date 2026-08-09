import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('blog_posts')
export class BlogPostOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  categoryId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text' })
  excerpt: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 500 })
  coverImage: string;

  @Column({ type: 'varchar', length: 255 })
  authorName: string;

  @Column({ type: 'int', default: 5 })
  readingTimeMinutes: number;

  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ type: 'timestamp' })
  publishedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'jsonb', default: [] })
  relatedProductIds: string[];
}
