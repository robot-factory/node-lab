import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(
    type => ArticleEntity,
    article => article.author,
  )
  articles: ArticleEntity[];
}
