import {
  Column,
  Entity, JoinColumn,
  JoinTable,
  ManyToMany, OneToMany, OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import {ReportEntity} from "./ReportEntity";
import {AdminEntity} from "./AdminEntity";
import {AutoMap} from "@automapper/classes";
import {PlaceEntity} from "./PlaceEntity";

@Entity("Team")
export class TeamEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number

  @AutoMap()
  @Column()
  name: string

  @AutoMap(() => [AdminEntity])
  @ManyToMany(() => AdminEntity)
  @JoinTable()
  volunteers: AdminEntity[]

  @OneToMany(() => ReportEntity, (report) => report.team)
  @JoinColumn()
  reports: ReportEntity[]

  @AutoMap(() => PlaceEntity)
  @OneToMany(() => PlaceEntity, place => place.team)
  @JoinColumn()
  places: PlaceEntity[]
}