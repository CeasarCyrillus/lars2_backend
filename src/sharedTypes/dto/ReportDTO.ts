import {ReportStatus} from "./ReportStatus";
import {AutoMap} from "@automapper/classes";
import {TeamDTO} from "./TeamDTO";
import {AdminDTO} from "./AdminDTO";
import {ReportEntity} from "../../data/entity/ReportEntity";
import {mapper} from "./mapper";


export class ReportDTO {
  @AutoMap()
  id: number

  @AutoMap(() => TeamDTO)
  team: TeamDTO

  @AutoMap()
  report_date: string

  @AutoMap()
  revision: number

  @AutoMap()
  status: ReportStatus

  @AutoMap()
  period: string

  @AutoMap(() => AdminDTO)
  reporter: AdminDTO
}

export const mapReport = (reportEntity: ReportEntity): ReportDTO => mapper.map(reportEntity, ReportEntity, ReportDTO)