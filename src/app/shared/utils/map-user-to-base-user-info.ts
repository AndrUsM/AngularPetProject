import { BaseUserDto } from "@core/models/user-base-dto";
import { UserDto } from "@core/models/user-dto";

export const mapUserTpBaseUserInfo = ({
  firstName,
  lastName,
  image,
  role
}: UserDto): BaseUserDto => ({
  firstName,
  lastName,
  image,
  role
})