import {AppDataSource} from "../data-source";
import {UserEntity} from "../entity/UserEntity";

export const userRepository = AppDataSource.getRepository(UserEntity)