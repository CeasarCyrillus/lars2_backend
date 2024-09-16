import {AppDataSource} from "../data-source";
import {EventEntity} from "../entity/EventEntity";

export const EventRepository = AppDataSource.getRepository(EventEntity)