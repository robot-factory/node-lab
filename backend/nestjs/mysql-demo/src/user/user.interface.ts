export interface UserData {
  id: number
  username: string;
  email: string;
  password: string
}

export interface UserResponse {
  user: UserData;
}