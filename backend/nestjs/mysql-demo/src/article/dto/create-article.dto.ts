import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string

  body: string

  @IsNotEmpty()
  tagList: string[]

  favoriteCount: number
}