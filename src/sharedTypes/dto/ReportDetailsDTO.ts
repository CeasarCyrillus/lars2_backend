import {ReportDTO} from "./ReportDTO";
import {AutoMap} from "@automapper/classes";
import {ReportEntity} from "../../data/entity/ReportEntity";
import {mapper} from "./mapper";

export class ReportDetailsDTO extends ReportDTO{
  @AutoMap()
  note?: string
}

export const mapReportDetails = (reportEntity: ReportEntity): ReportDetailsDTO => mapper.map(reportEntity, ReportEntity, ReportDetailsDTO)