export interface User{
  id?: number;
  username: string;
  rol: Rol;
  email: string;
  password: string;
}

export interface UserInfo{
  username: string;
  rol: Rol;
  email: string
}

export enum Rol {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT'
}
