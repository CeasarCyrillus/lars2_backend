import {AppDataSource} from "../data-source";
import {EventEntity} from "../entity/EventEntity";
import {PlaceEntity} from "../entity/PlaceEntity";

export const PlaceRepository = AppDataSource.getRepository(PlaceEntity)