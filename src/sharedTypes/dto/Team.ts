import {Contact} from "./Contact";

export type Team = {
  id: number,
  name: string,
  contacts: Contact[]
  mainContact: Contact
  association: number
  specialAssociation: number | null
  reports: number[],
  created: Date
}