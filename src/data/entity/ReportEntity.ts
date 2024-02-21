import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {TeamEntity} from "./TeamEntity";
import {ReportStatus} from "../../sharedTypes/dto/ReportStatus";
import {AutoMap} from "@automapper/classes";
import {AdminEntity} from "./AdminEntity";

@Entity("Report")
export class ReportEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number

  @AutoMap(() => TeamEntity)
  @ManyToOne(() => TeamEntity, (team) => team.reports)
  team: TeamEntity

  @AutoMap()
  @CreateDateColumn()
  report_date: string

  @AutoMap()
  @Column()
  revision: number

  @AutoMap()
  @Column()
  status: ReportStatus

  @AutoMap()
  @Column()
  period: string

  @AutoMap(() => AdminEntity)
  @OneToOne(() => AdminEntity, {cascade: true, eager: true})
  @JoinColumn()
  reporter: AdminEntity

  @AutoMap()
  @Column({nullable: true})
  note?: string
}