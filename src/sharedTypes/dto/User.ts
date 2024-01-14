import {UserRole} from "./UserRole";

export type User = {
  id: number
  username: string
  email: string
  name: string
  phone: string
  role: UserRole
}