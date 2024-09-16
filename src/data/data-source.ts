import "reflect-metadata"
import { DataSource } from "typeorm"
import {getConfig} from "../GetConfig";
import {TeamEntity} from "./entity/TeamEntity";
import {ReportEntity} from "./entity/ReportEntity";
import {AdminEntity} from "./entity/AdminEntity";
import {PlaceEntity} from "./entity/PlaceEntity";
import {EventEntity} from "./entity/EventEntity";

const environmentConfig = getConfig()
export const AppDataSource = new DataSource({
        type: "postgres",
        ...environmentConfig.database,
        entities: [
          TeamEntity,
          AdminEntity,
          ReportEntity,
          PlaceEntity,
          EventEntity
        ],
        migrations: [],
        subscribers: [],
    });

