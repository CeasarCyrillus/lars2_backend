import {Team} from "./sharedTypes/dto/Team";
import {Report} from "./sharedTypes/dto/Report";
import {User} from "./sharedTypes/dto/User";

export const user: User = {
  email: "",
  id: 0,
  name: "name",
  phone: "phone",
  username: "ceasar",
  role: "admin"
}


export const team: Team = {
  id: 0,
  association: 0,
  contacts: [],
  mainContact: {
    email: "email@email.com",
    name: "Henrik Tylenius",
    phone: "+93-12991291"
  },
  name: "Leksands IF",
  reports: [],
  specialAssociation: undefined,
  created: new Date()
}

export const fakeReportDto1: Report = {
  created: new Date(),
  period: new Date("2023-08"),
  reporter: {email: "henkan@email.com", name: "Henrik Jurelius", phone: "01992-1292992"},
  revision: "A",
  status: "not-started",
  teamName: "Team IF Fotboll",
}

export const fakeReportDto2: Report = {
  created: new Date("2023-08-11"),
  period: new Date("2023-08"),
  reporter: {email: "ceasar@email.com", name: "Ceasar Cyrillus", phone: "073 232 46 21"},
  revision: "",
  status: "in-progress",
  teamName: "Team IF Fotboll",
}

export const fakeReportDto3: Report = {
  created: new Date("2023-08-11"),
  period: new Date("2023-08"),
  reporter: {email: "ceasar@email.com", name: "Ceasar Cyrillus", phone: "073 232 46 21"},
  revision: "",
  status: "approved",
  teamName: "Team IF Fotboll",
}

export const fakeReportDto4: Report = {
  created: new Date("2023-08-11"),
  period: new Date("2023-08"),
  reporter: {email: "ceasar@email.com", name: "Ceasar Cyrillus", phone: "073 232 46 21"},
  revision: "",
  status: "past-deadline",
  teamName: "Team IF Fotboll",
}