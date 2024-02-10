import {AppDataSource} from "../data-source";
import {Filter, isTextFilter, TextFilter} from "../../sharedTypes/dto/Filter";
import {EntityTarget, ObjectLiteral, Repository, SelectQueryBuilder} from "typeorm";
import {Page} from "../../sharedTypes/dto/Page";
import {QueryModel} from "../../sharedTypes/socket/request/QueryModel";

export const executeTextFilter = <TEntity extends ObjectLiteral>(entityName: string, queryBuilder: SelectQueryBuilder<TEntity> , filterModel: TextFilter, column: string) => {
  const parameterId = (Math.random() + 1).toString(36).substring(7)
  const filterParameter = `filter${parameterId}`
  switch (filterModel.type) {
    case "contains":
      queryBuilder = queryBuilder
        .andWhere(`${column} ILIKE :${filterParameter}`, {[filterParameter]: `%${filterModel.filter}%`})
      break;
    case "equals":
      queryBuilder = queryBuilder
        .andWhere(`${column} = :${filterParameter}`, {[filterParameter]: filterModel.filter})
      break;
    case "startsWith":
      queryBuilder = queryBuilder
        .andWhere(`${column} ILIKE :${filterParameter}`, {[filterParameter]: `${filterModel.filter}%`})
      break;
  }

  return queryBuilder
}

export const getFilteredResponse = async <TEntity extends ObjectLiteral, TQueryModel>(
  entityName: string,
  queryModel: QueryModel<TQueryModel>,
  queryBuilder: SelectQueryBuilder<TEntity>
) => {
  const {filter, page} = queryModel
  queryBuilder = filterRows(entityName, queryBuilder, filter)
  queryBuilder = paginate(queryBuilder, page)
  const count = await getEntityCount(queryBuilder)
  const data = await queryBuilder
    .getMany()

  return {
    data: data,
    count: count,
  }
}

const getEntityCount = <TEntity extends ObjectLiteral>( queryBuilder: SelectQueryBuilder<TEntity>) =>
  queryBuilder.getCount()

const paginate = <TEntity extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<TEntity>, page: Page) =>
  queryBuilder
    .skip(page.startRow)
    .take(page.endRow - page.startRow)

const filterRows = <TEntity extends ObjectLiteral, TFilterModel>(entityName: string, queryBuilder: SelectQueryBuilder<TEntity>, filter: Filter<TFilterModel>) => {
  for (const column in filter) {
    const filterModel = filter[column]
    if (filterModel && column) {
      if (isTextFilter(filterModel)) {
        queryBuilder = executeTextFilter(entityName, queryBuilder, filterModel, column)
      }
    }
  }

  return queryBuilder
}

type SelectQueryFunc<TEntity extends ObjectLiteral> = (repository: Repository<TEntity>) => SelectQueryBuilder<TEntity>
type Entity<T> = EntityTarget<T> & ObjectLiteral
export const repositoryWithFilter = <TEntity extends ObjectLiteral, TFilterModel>(entity: Entity<TEntity>, selectQuery: SelectQueryFunc<TEntity>) => {
  const repository = AppDataSource.getRepository(entity)
  return repository.extend({
    filter: (queryModel: QueryModel<TFilterModel>) =>
      getFilteredResponse(entity.name, queryModel, selectQuery(repository))
  })
}