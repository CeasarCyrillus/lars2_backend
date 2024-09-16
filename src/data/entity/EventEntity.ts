import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {AutoMap} from "@automapper/classes";
import {AdminEntity} from "./AdminEntity";
import {PlaceEntity} from "./PlaceEntity";
import {ReportEntity} from "./ReportEntity";

@Entity("Event")
export class EventEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @CreateDateColumn()
  created_at: Date

  @AutoMap()
  @UpdateDateColumn()
  updated_at: Date

  @AutoMap()
  @Column()
  from: Date

  @AutoMap()
  @Column()
  to: Date

  @AutoMap(() => AdminEntity)
  @ManyToOne(() => AdminEntity, (reporter) => reporter.events)
  @JoinColumn()
  reporter: AdminEntity

  @AutoMap()
  @Column({nullable: true})
  note?: string

  @AutoMap(() => PlaceEntity)
  @ManyToOne(() => PlaceEntity, place => place.team.places)
  @JoinColumn()
  place: PlaceEntity

  @AutoMap(() => ReportEntity)
  @ManyToOne(() => ReportEntity, (report) => report.events)
  report: ReportEntity
}