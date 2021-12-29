export interface User{
  id?: number;
  username: string;
  rol: Rol;
  email: string;
  password: string;
}

export enum Rol {
  ADMIN,
  CLIENT
}
