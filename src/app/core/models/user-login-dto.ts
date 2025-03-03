export interface UserLoginDto {
  username: string;
  pasword: string;
  expiresInMins?: number;
}