import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserRole} from "../../sharedTypes/dto/UserRole";
import {AutoMap} from "@automapper/classes";

@Entity("Admin")
export class AdminEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number

  @AutoMap()
  @Column()
  username: string

  @Column()
  passwordHash: string

  @AutoMap()
  @CreateDateColumn()
  created_at: Date

  @AutoMap()
  @Column()
  email?: string

  @AutoMap()
  @Column()
  name: string

  @AutoMap()
  @Column()
  phone?: string

  @AutoMap()
  @Column()
  role: UserRole
}