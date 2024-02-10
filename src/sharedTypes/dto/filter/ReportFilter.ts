import {Filter} from "../Filter";

export const legalReportFilters = ["team.name", "reporter.email", "reporter.phone", "reporter.name", "status", "period"] as const
export type LegalReportFilters = typeof legalReportFilters
export type ReportFilter = Filter<LegalReportFilters>