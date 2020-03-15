import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    userId: number,
    articleData: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const author = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['articles'],
    });
    let article = new ArticleEntity();
    article.title = articleData.title;
    article.tagList = articleData.tagList || [];
    article.body = articleData.body;
    article.author = author;

    const newArticle = await this.articleRepository.save(article);

    return newArticle;
  }
}
