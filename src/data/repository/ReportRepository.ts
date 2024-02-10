import {ReportEntity} from "../entity/ReportEntity";
import {Repository} from "typeorm";
import {repositoryWithFilter} from "./util";

const getQueryBuilder = (repository: Repository<ReportEntity>) => repository
  .createQueryBuilder(ReportEntity.name)
  .leftJoinAndSelect(`${ReportEntity.name}.team`, 'team')
  .leftJoinAndSelect(`${ReportEntity.name}.reporter`, 'reporter')
  .orderBy(`${ReportEntity.name}.period`, "DESC")

export const ReportRepository = repositoryWithFilter(ReportEntity, getQueryBuilder)