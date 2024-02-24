import {UserRole} from "./UserRole";
import {AutoMap} from "@automapper/classes";
import {AdminEntity} from "../../data/entity/AdminEntity";
import {mapper} from "./mapper";

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

export const mapAdminUser = (entity: AdminEntity) => mapper.map(entity, AdminEntity, AdminDTO)