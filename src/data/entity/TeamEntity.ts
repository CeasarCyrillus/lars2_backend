import {
  Column,
  Entity,
  JoinTable,
  ManyToMany, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import {ReportEntity} from "./ReportEntity";
import {AdminEntity} from "./AdminEntity";
import {AutoMap} from "@automapper/classes";

@Entity("Team")
export class TeamEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number

  @AutoMap()
  @Column()
  name: string

  @AutoMap(() => [AdminEntity])
  @ManyToMany(() => AdminEntity,{cascade: true, eager: true})
  @JoinTable()
  reporters: AdminEntity[]

  @OneToMany(() => ReportEntity, (report) => report.team, {cascade: true})
  reports: ReportEntity[]
}