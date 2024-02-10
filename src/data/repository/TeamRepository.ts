import {AppDataSource} from "../data-source";
import {TeamEntity} from "../entity/TeamEntity";

export const TeamRepository = AppDataSource.getRepository(TeamEntity)