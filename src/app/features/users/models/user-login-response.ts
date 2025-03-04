import { UserDto } from "../../../core/models/user-dto";

export interface UserLoginResponse extends UserDto {
  accessToken: string;
  refreshToken: string;
}