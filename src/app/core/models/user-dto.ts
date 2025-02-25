export type Gender = 'male' | 'female';
export type Role = "user" | "admin";

interface UserHair {
  color: string;
  type: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  address: string;
  city: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

interface UserBank {
  department: string,
  name: string,
  title: string,
  address: Address;
}

interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string; // YYYY-M-DD
  image?: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair?: UserHair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: UserBank;
  role: Role;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
}