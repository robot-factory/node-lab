import { Controller, Get, Post, Req, Body, Header, HttpCode, HttpStatus } from '@nestjs/common';
import {CreateUserDto} from './dto'
import {UserService} from './user.service'
import {UserResponse} from './user.interface'


@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}
  @Get('/')
  getUsers(): string[] {
    return ['a', 'b', 'c'];
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: CreateUserDto):Promise<UserResponse> {
    const result = await this.userService.AddUser(body)
    console.log(result)
    return result
  }
}
