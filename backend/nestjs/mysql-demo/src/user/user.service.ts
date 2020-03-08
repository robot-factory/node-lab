import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { UserResponse } from './user.interface'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async AddUser(dto: CreateUserDto): Promise<UserResponse> {
    const { username, email, password } = dto;
    const newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    const saveUser = await this.userRepository.save(newUser)
    return this.UserResponseFactory(saveUser)
  }

  private UserResponseFactory(user: UserEntity): UserResponse {
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
      }
    }
  }
}
