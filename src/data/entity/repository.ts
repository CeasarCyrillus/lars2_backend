import {AppDataSource} from "../data-source";
import {AdminEntity} from "./AdminEntity";
import {TeamEntity} from "./TeamEntity";
import {ReportEntity} from "./ReportEntity";
import {ReportFilter} from "../../sharedTypes/dto/ReportFilter";
import {FilterModel, isTextFilter, TextFilter} from "../../sharedTypes/dto/Filter";
import {QueryResponse} from "../../sharedTypes/socket/response/QueryResponse";
import {QueryRequest} from "../../sharedTypes/socket/request/QueryRequest";
import {SelectQueryBuilder} from "typeorm";

export const adminRepository = AppDataSource.getRepository(AdminEntity)
export const teamRepository = AppDataSource.getRepository(TeamEntity)

const filterReports = (filter: ReportFilter) => {
  let queryBuilder = AppDataSource.getRepository(ReportEntity)
    .createQueryBuilder(ReportEntity.name)
    .leftJoinAndSelect(`${ReportEntity.name}.team`, 'team')
    .leftJoinAndSelect(`${ReportEntity.name}.reporter`, 'reporter')

  const filterColumns = Object.keys(filter)
  for(const column of filterColumns) {
    // TODO: parameterize filterkey, it is vulnerable for SQL injection attacks
    const filterModel: FilterModel = filter[column];
    if (isTextFilter(filterModel)) {
      queryBuilder = executeTextFilter(queryBuilder, filterModel, ReportEntity.name, column)
    }
  }

  return queryBuilder
}

export const reportRepository = AppDataSource.getRepository(ReportEntity).extend({
  async filter(queryModel: QueryRequest<ReportFilter>): Promise<QueryResponse<ReportEntity[]>> {
    const {filter, page} = queryModel
    const queryBuilder = filterReports(filter)
    const count = await queryBuilder.getCount()
    const data = await queryBuilder
        .skip(page.startRow)
        .take(page.endRow - page.startRow)
        .getMany()

    return {
      data: data,
      count: count,
    }
  }
})

const executeTextFilter = <T>(queryBuilder: SelectQueryBuilder<T> ,filterModel: TextFilter, entity: string, column: string) => {
  const selectColumn = `${entity}.${column}`
  switch (filterModel.type) {
    case "contains":
      queryBuilder = queryBuilder
        .andWhere(`${selectColumn} ILIKE :${column}`, {[column]: `%${filterModel.filter}%`})
      break;
    case "equals":
      queryBuilder = queryBuilder
        .andWhere(`${selectColumn} = :${column}`, {[column]: filterModel.filter})
      break;
    case "startsWith":
      queryBuilder = queryBuilder
        .andWhere(`${selectColumn} ILIKE :${column}`, {[column]: `${filterModel.filter}%`})
      break;
  }

  return queryBuilder
}

