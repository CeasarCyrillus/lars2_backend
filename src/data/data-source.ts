import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "./entity/UserEntity"
import {getConfig} from "../GetConfig";

const environmentConfig = getConfig()
export const AppDataSource = new DataSource({
        type: "postgres",
        ...environmentConfig.database,
        entities: [UserEntity],
        migrations: [],
        subscribers: [],
    });

