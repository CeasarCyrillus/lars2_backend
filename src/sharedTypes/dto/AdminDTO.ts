import {UserRole} from "./UserRole";
import {AutoMap} from "@automapper/classes";

export class AdminDTO {
  @AutoMap()
  id: number

  @AutoMap()
  username: string

  @AutoMap()
  created_at: Date

  @AutoMap()
  email?: string

  @AutoMap()
  name: string

  @AutoMap()
  phone?: string

  @AutoMap()
  role: UserRole
}