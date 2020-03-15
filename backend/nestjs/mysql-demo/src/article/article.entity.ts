import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, JoinColumn, AfterUpdate, BeforeUpdate, JoinTable } from 'typeorm';
import { UserEntity } from '../user/user.entity';
// import { Comment } from './comment.entity';

@Entity('article')
export class ArticleEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  title: string;

  @Column({default: ''})
  body: string;

  @Column('simple-array')
  tagList: string[];

  @ManyToOne(type => UserEntity, user => user.articles)
  @JoinTable()
  author: UserEntity;

  // @OneToMany(type => Comment, comment => comment.article, {eager: true})
  // @JoinColumn()
  // comments: Comment[];

  @Column({default: 0})
  favoriteCount: number;
}