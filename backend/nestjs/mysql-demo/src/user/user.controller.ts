import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import {CreateUserDto} from './dto'
import { Request, json } from 'express';
import {UserService} from './user.service'


@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}
  @Get('/')
  getUsers(): string[] {
    return ['a', 'b', 'c'];
  }

  @Post('/register')
  register(@Body() body: CreateUserDto):string {
    const result = this.userService.AddUser(body)
    return JSON.stringify(result)
  }
}
