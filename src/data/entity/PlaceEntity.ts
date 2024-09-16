import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AutoMap} from "@automapper/classes";
import {TeamEntity} from "./TeamEntity";

@Entity("Place")
export class PlaceEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string

  @AutoMap()
  @Column()
  address: string

  @AutoMap()
  @Column()
  postalCode: string

  @AutoMap()
  @Column()
  city: string

  @AutoMap()
  @Column({nullable: true})
  comment?: string

  @ManyToOne(() => TeamEntity, (team) => team.places)
  team: TeamEntity
}