import {IsNotEmpty} from 'class-validator'

export class LoginUserDto {
  @IsNotEmpty()
  readonly usernamme: string;
  @IsNotEmpty()
  readonly password: string;
}