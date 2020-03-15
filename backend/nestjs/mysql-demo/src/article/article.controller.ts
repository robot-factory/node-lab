import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import {ArticleService} from './article.service'
import {CreateArticleDto} from './dto/create-article.dto'

@Controller('article')
export class ArticleController {

  constructor(private readonly articleService:ArticleService) {}

  @Get('/')
  getArticles() {
    return ['a1','b1','c1']
  }

  @Post('/:id')
  createArticle(@Param('id') id: number, @Body() createArticle: CreateArticleDto) {
    const res = this.articleService.create(id,createArticle)
    return res
  }
}
