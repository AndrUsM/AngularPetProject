import { UserDto } from "./user-dto";

export interface UserLoginResponse extends UserDto {
  accessToken: string;
  refreshToken: string;
}