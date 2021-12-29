import { Rol, User } from "src/app/models/user.model";

export const usersMock: User[] = [
  {
    id: 1,
    username: 'Jona',
    rol: Rol.ADMIN,
    email: 'jona@gmail.com',
    password: 'jona123'
  },
  {
    id: 2,
    rol: Rol.CLIENT,
    username: 'Adrian',
    email: 'adrian@gmail.com',
    password: 'adrian123'
  }
]
