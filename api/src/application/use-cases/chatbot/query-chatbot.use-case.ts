import { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import { IBlogPostRepository } from '../../../domain/repositories/blog-post.repository.interface';

export interface ChatbotQueryInput {
  message: string;
}

export interface RecommendedProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  imageUrl?: string;
  origin?: string;
  similarityScore?: number;
}

export interface RecommendedBlogPost {
  id: string;
  title: string;
  slug: string;
  readingTimeMinutes: number;
  coverImage?: string;
  similarityScore?: number;
}

export interface ChatbotQueryOutput {
  reply: string;
  suggestedPrompts: string[];
  recommendedProducts: RecommendedProduct[];
  recommendedBlogPosts: RecommendedBlogPost[];
}

export class QueryChatbotUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly blogPostRepository: IBlogPostRepository,
  ) {}

  /**
   * Helper: Normalize text for Vietnamese tokenization
   */
  private normalizeText(text: string): string {
    return (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Helper: Extract n-grams / tokens from text
   */
  private tokenize(text: string): string[] {
    const rawTokens = text
      .toLowerCase()
      .replace(/[^\w\sàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/gi, ' ')
      .split(/\s+/)
      .filter((t) => t.length >= 2);
    
    const bigrams: string[] = [];
    for (let i = 0; i < rawTokens.length - 1; i++) {
      bigrams.push(`${rawTokens[i]} ${rawTokens[i + 1]}`);
    }
    return [...rawTokens, ...bigrams];
  }

  /**
   * Helper: Calculate Term Frequency Vector (TF Vector)
   */
  private createTermVector(tokens: string[]): Map<string, number> {
    const vec = new Map<string, number>();
    for (const token of tokens) {
      vec.set(token, (vec.get(token) || 0) + 1);
    }
    return vec;
  }

  /**
   * Helper: Cosine Similarity Vector Search calculation
   */
  private computeCosineSimilarity(vecA: Map<string, number>, vecB: Map<string, number>): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (const [term, weightA] of vecA.entries()) {
      normA += weightA * weightA;
      if (vecB.has(term)) {
        dotProduct += weightA * (vecB.get(term) || 0);
      }
    }

    for (const weightB of vecB.values()) {
      normB += weightB * weightB;
    }

    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  async execute(input: ChatbotQueryInput): Promise<ChatbotQueryOutput> {
    const rawInput = input.message.trim().replace(/^[^a-zA-Z0-9àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]+/i, '').trim();
    const queryLower = rawInput.toLowerCase();

    // 1. Fetch available products and blog posts from PostgreSQL repositories
    const { items: allProducts } = await this.productRepository.findAll({ limit: 100 });
    const { items: allBlogs } = await this.blogPostRepository.findAll({ limit: 50 });

    const defaultPrompts: string[] = [
      '🥗 Thực đơn ăn gì để giảm cân an toàn?',
      '🌾 Gợi ý sản phẩm gạo lứt dẻo ngon',
      '🍵 Công dụng của trà đậu đen gạo lứt',
      '🚚 Hướng dẫn chính sách giao hàng COD',
    ];

    // Check for simple greetings
    const greetings = ['hi', 'hello', 'xin chào', 'chao', 'chào', 'alo', 'helo', 'dạ', 'da'];
    if (greetings.includes(queryLower) || queryLower === 'chào bạn' || queryLower === 'xin chào bạn') {
      return {
        reply: `Dạ GreenPantry xin chào bạn! 🌿 Hôm nay mình có thể hỗ trợ tư vấn sản phẩm mộc, thực đơn giảm cân Eat Clean hay thông tin đặt hàng nào cho bạn ạ? 😊`,
        suggestedPrompts: defaultPrompts,
        recommendedProducts: [],
        recommendedBlogPosts: [],
      };
    }

    // 2. Vectorize Query
    const queryTokens = this.tokenize(queryLower);
    const queryVector = this.createTermVector(queryTokens);

    // 3. Vector Similarity Search over Product Descriptions & Attributes
    const productSimilarityResults = allProducts.map((p) => {
      const docText = `${p.name} ${p.description} ${p.ingredients} ${p.nutritionInfo} ${p.origin} ${p.categoryName || ''}`;
      const docTokens = this.tokenize(docText);
      const docVector = this.createTermVector(docTokens);
      const score = this.computeCosineSimilarity(queryVector, docVector);

      return {
        product: p,
        score,
      };
    });

    // Sort products by Vector Cosine Similarity Score descending
    const sortedProducts = productSimilarityResults
      .filter((item) => item.score > 0.05)
      .sort((a, b) => b.score - a.score);

    // 4. Vector Similarity Search over Blog Content
    const blogSimilarityResults = allBlogs.map((b) => {
      const docText = `${b.title} ${b.excerpt} ${b.content}`;
      const docTokens = this.tokenize(docText);
      const docVector = this.createTermVector(docTokens);
      const score = this.computeCosineSimilarity(queryVector, docVector);

      return {
        blog: b,
        score,
      };
    });

    const sortedBlogs = blogSimilarityResults
      .filter((item) => item.score > 0.05)
      .sort((a, b) => b.score - a.score);

    // 5. Human-like Natural Consultant Synthesis Logic
    const topScore = sortedProducts.length > 0 ? sortedProducts[0].score : 0;

    // Case 5A: No Matching Vector Data Found (Gibberish / Unknown query like "ssss")
    if (topScore < 0.10) {
      return {
        reply: `Dạ, GreenPantry hiện chưa tìm thấy thông tin sản phẩm hay bài viết phù hợp với từ khóa **"${rawInput}"**.\n\nBạn có thể cho mình biết rõ hơn tên loại sản phẩm (như gạo lứt, yến mạch, bột sắn dây, trà thảo mộc...) hoặc nhu cầu dinh dưỡng để mình tư vấn chính xác nhất cho bạn nhé! 😊`,
        suggestedPrompts: defaultPrompts,
        recommendedProducts: [],
        recommendedBlogPosts: [],
      };
    }

    // Case 5B: Valid Vector Matches Found -> Human Consultant Style Reply
    const matchedProducts: RecommendedProduct[] = sortedProducts.slice(0, 4).map((item) => ({
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      price: Number(item.product.price),
      compareAtPrice: item.product.compareAtPrice ? Number(item.product.compareAtPrice) : null,
      imageUrl: (item.product.images && item.product.images[0]) || '/images/products/gao-lut-st25.webp',
      origin: item.product.origin,
      similarityScore: Number((item.score * 100).toFixed(1)),
    }));

    const matchedBlogs: RecommendedBlogPost[] = sortedBlogs.slice(0, 2).map((item) => ({
      id: item.blog.id,
      title: item.blog.title,
      slug: item.blog.slug,
      readingTimeMinutes: item.blog.readingTimeMinutes || 5,
      coverImage: item.blog.coverImage,
      similarityScore: Number((item.score * 100).toFixed(1)),
    }));

    let replyText = `Dạ GreenPantry xin tư vấn các sản phẩm và giải pháp phù hợp nhất với tìm kiếm **"${rawInput}"** của bạn đây ạ:\n\n`;

    sortedProducts.slice(0, 3).forEach((item, idx) => {
      const p = item.product;
      replyText += `🌿 **${idx + 1}. ${p.name}**\n`;
      replyText += `   ${p.description}\n\n`;
    });

    replyText += `Dưới đây là chi tiết các sản phẩm & bài viết hướng dẫn bạn có thể tham khảo thêm ạ:`;

    return {
      reply: replyText,
      suggestedPrompts: defaultPrompts,
      recommendedProducts: matchedProducts,
      recommendedBlogPosts: matchedBlogs,
    };
  }
}
