import {AppDataSource} from "../data-source";
import {AdminEntity} from "./AdminEntity";
import {TeamEntity} from "./TeamEntity";
import {ReportEntity} from "./ReportEntity";

export const adminRepository = AppDataSource.getRepository(AdminEntity)
export const teamRepository = AppDataSource.getRepository(TeamEntity)
export const reportRepository = AppDataSource.getRepository(ReportEntity)