import {AutoMap} from "@automapper/classes";

export class PlaceDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string

  @AutoMap()
  address: string

  @AutoMap()
  postalCode: string

  @AutoMap()
  city: string

  @AutoMap()
  comment?: string
}