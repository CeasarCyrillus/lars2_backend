import {Filter} from "../Filter";

export const legalTeamFilters = ["name", "reporter.email", "reporter.name"] as const
export type LegalTeamFilters = typeof legalTeamFilters
export type TeamFilter = Filter<LegalTeamFilters>