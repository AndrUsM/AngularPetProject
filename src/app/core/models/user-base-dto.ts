import { UserDto } from "./user-dto";

export interface BaseUserDto {
  firstName: UserDto['firstName'];
  lastName: UserDto['lastName'];
  role: UserDto['role'];
  image: UserDto['image'];
}