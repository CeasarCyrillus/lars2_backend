import {Association} from "./domain/association/association";
import {Team} from "./domain/team/team";
import {User} from "./domain/authentication/User";
import {Report} from "./domain/report/report";
import {ReportDTO} from "./domain/report/reportDTO";

export const user: User = {
  id: 0,
  name: "Ceasar Cyrillus",
  email: "email@hotmail.com"
}

export const team: Team = {
  id: 0,
  association: 0,
  contacts: [0],
  name: "Leksands IF",
  reports: [],
  specialAssociation: undefined
}

export const association: Association = {
  id: 0,
  name: "Footballl association",
  teams: [0]
}

export const report: Report = {
  id: 0,
  created: new Date(),
  period: new Date("01-2019"),
  reporter: 0,
  revisions: 0,
  team: 0
}

export const fakeReportDto1: ReportDTO = {
  created: new Date(),
  period: new Date("2023-08"),
  reporter: {email: "henkan@email.com", name: "Henrik Jurelius", phone: "01992-1292992"},
  revision: "A",
  status: "not-started",
  teamName: "Team IF Fotboll",
}

export const fakeReportDto2: ReportDTO = {
  created: new Date("2023-08-11"),
  period: new Date("2023-08"),
  reporter: {email: "ceasar@email.com", name: "Ceasar Cyrillus", phone: "073 232 46 21"},
  revision: "",
  status: "in-progress",
  teamName: "Team IF Fotboll",
}

export const fakeReportDto3: ReportDTO = {
  created: new Date("2023-08-11"),
  period: new Date("2023-08"),
  reporter: {email: "ceasar@email.com", name: "Ceasar Cyrillus", phone: "073 232 46 21"},
  revision: "",
  status: "approved",
  teamName: "Team IF Fotboll",
}

export const fakeReportDto4: ReportDTO = {
  created: new Date("2023-08-11"),
  period: new Date("2023-08"),
  reporter: {email: "ceasar@email.com", name: "Ceasar Cyrillus", phone: "073 232 46 21"},
  revision: "",
  status: "past-deadline",
  teamName: "Team IF Fotboll",
}