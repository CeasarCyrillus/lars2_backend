import {AppDataSource} from "../data-source";
import {AdminEntity} from "./AdminEntity";
import {TeamEntity} from "./TeamEntity";
import {ReportEntity} from "./ReportEntity";
import {ReportFilter} from "../../sharedTypes/dto/ReportFilter";
import {FilterModel} from "../../sharedTypes/dto/Filter";
import {QueryResponse} from "../../sharedTypes/socket/response/QueryResponse";
import {QueryRequest} from "../../sharedTypes/socket/request/QueryRequest";

export const adminRepository = AppDataSource.getRepository(AdminEntity)
export const teamRepository = AppDataSource.getRepository(TeamEntity)

const filterReports = (filter: ReportFilter) => {
  let queryBuilder = AppDataSource.getRepository(ReportEntity)
    .createQueryBuilder(ReportEntity.name)
    .leftJoinAndSelect(`${ReportEntity.name}.team`, 'team')
    .leftJoinAndSelect(`${ReportEntity.name}.reporter`, 'reporter')

  const filterKeys = Object.keys(filter)
  for(const filterKey of filterKeys) {
    const filterModel: FilterModel = filter[filterKey];
    // TODO: add parent switch case to deal with different types of filters
    switch (filterModel.type) {
      case "contains":
        queryBuilder = queryBuilder
          .andWhere(`${ReportEntity.name}.${filterKey} ILIKE :${filterKey}`, { [filterKey]: `%${filterModel.filter}%` })
        break;
      case "equals":
        queryBuilder = queryBuilder
          .andWhere(`${ReportEntity.name}.${filterKey} = :${filterKey}`, { [filterKey]: filterModel.filter })
        break;
      case "startsWith":
        queryBuilder = queryBuilder
          .andWhere(`${ReportEntity.name}.${filterKey} ILIKE :${filterKey}`, { [filterKey]: `${filterModel.filter}%` })
        break;
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
      //.skip(page.startRow)
        //.take(page.endRow - page.startRow)
        .getMany()

    return {
      data: data,
      count: count,
    }
  }
})
