import {AutoMap} from "@automapper/classes";
import {PlaceDTO} from "./PlaceDTO";
import {TeamDTO} from "./TeamDTO";
import {AdminDTO} from "./AdminDTO";

export class EventDTO {

  @AutoMap()
  id: number;

  @AutoMap(() => TeamDTO)
  team: TeamDTO

  @AutoMap()
  created_at: string

  @AutoMap()
  updated_at: string

  @AutoMap()
  from: Date

  @AutoMap()
  to: Date

  @AutoMap(() => AdminDTO)
  reporter: AdminDTO

  @AutoMap()
  note?: string

  @AutoMap(() => PlaceDTO)
  place: PlaceDTO
}