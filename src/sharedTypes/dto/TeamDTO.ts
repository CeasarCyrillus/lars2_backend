import {AutoMap} from "@automapper/classes";
import {AdminDTO} from "./AdminDTO";
import {mapper} from "./mapper";
import {TeamEntity} from "../../data/entity/TeamEntity";

export class TeamDTO {
  @AutoMap()
  id: number

  @AutoMap()
  name: string

  @AutoMap(() => [AdminDTO])
  reporters: AdminDTO[]
}

export const mapTeam = (teamEntity: TeamEntity): TeamDTO => mapper.map(teamEntity, TeamEntity, TeamDTO)