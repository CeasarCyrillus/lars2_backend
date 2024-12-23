import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import {TeamEntity} from "./TeamEntity";
import {ReportStatus} from "../../sharedTypes/dto/ReportStatus";
import {AutoMap} from "@automapper/classes";
import {AdminEntity} from "./AdminEntity";
import {EventEntity} from "./EventEntity";

@Entity("Report")
export class ReportEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number

  @AutoMap()
  @CreateDateColumn()
  report_date: string

  @AutoMap()
  @Column()
  revision: number

  @AutoMap()
  @Column()
  period: string

  @AutoMap()
  @Column({nullable: true})
  note?: string

  @AutoMap(() => TeamEntity)
  @ManyToOne(() => TeamEntity, (team) => team.reports)
  team: TeamEntity

  @AutoMap(() => EventEntity)
  @OneToMany(() => EventEntity, (event) => event.report)
  @JoinColumn()
  events: EventEntity[];

  @AutoMap()
  @Column({nullable: false, default: "not-started"})
  status: ReportStatus

  @AutoMap(() => AdminEntity)
  @ManyToOne(() => AdminEntity, {nullable: false})
  @JoinColumn()
  reporter: AdminEntity
}