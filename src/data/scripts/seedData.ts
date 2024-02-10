import {AppDataSource} from "../data-source";
import {TeamEntity} from "../entity/TeamEntity";
import {faker} from "@faker-js/faker";
import {ReportEntity} from "../entity/ReportEntity";
import {generateHash} from "../../lib/password";
import {ReportStatus} from "../../sharedTypes/dto/ReportStatus";
import {AdminEntity} from "../entity/AdminEntity";
import moment from "moment";
import {ReportRepository} from "../repository/ReportRepository";
import {TeamRepository} from "../repository/TeamRepository";
import {AdminRepository} from "../repository/AdminRepository";

faker.seed(1118112)
const today = new Date("2024-03")
const yearsAgo = new Date("2015-01")

const range = (amount: number) => [...new Array(amount)].map((_, index) => index)
const generateTeam = () => {
  const team = new TeamEntity()
  team.name = `${faker.color.human()} ${faker.company.buzzNoun()} IF ${faker.number.int({min: 0, max: 500})}`
  return team
}

const generateReport = () => {
  const report = new ReportEntity()
  const statuses: ReportStatus[] = ["not-started", "past-deadline", "approved", "in-progress"]
  report.status = faker.helpers.arrayElement(statuses)
  report.report_date = moment(faker.date.between({from: yearsAgo, to: today})).format("YYYY-MM")
  report.period = moment(faker.date.between({from: yearsAgo, to: today})).format("YYYY-MM")
  if(report.report_date > report.period){
    report.status = "past-deadline"
  }
  report.revision = faker.number.int({min: 0, max:4})
  report.reporter = generateReporter()
  return report
}

const generateAdmin = () => {
  const admin = new AdminEntity()
  admin.passwordHash = generateHash("pwd")
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  admin.name = `${firstName} ${lastName}`
  admin.username = "admin"
  admin.email = "admin"
  admin.phone = faker.phone.number()
  admin.role = "admin"
  return admin
}

const generateReporter = () => {
  const reporter = new AdminEntity()
  reporter.passwordHash = "pwd"
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  reporter.name = `${firstName} ${lastName}`
  reporter.username = faker.internet.userName({firstName, lastName})
  reporter.email = faker.internet.email({firstName, lastName})
  reporter.phone = faker.phone.number()
  reporter.role = "reporter"
  return reporter
}

const generateReports = (amount: number) => range(amount).map(generateReport)
const generateReporters = (amount: number) => range(amount).map(generateReporter)
const generateTeams = (amount: number) => range(amount).map((i) => {
  console.log(`    generating team ${i+1}/${amount}`)
  const team = generateTeam()
  team.reporters = generateReporters(faker.number.int({min:1, max:2}))
  team.reports = generateReports(12 * 10)
  return team
})

  const clearDb = async () => {
    await ReportRepository.delete({})
    await AdminRepository.delete({})
    await TeamRepository.delete({})
}

AppDataSource.initialize().then(async () => {
  console.log("1. clearing database...")
  await clearDb()
  console.log("2. done")
  console.log("3. generating data")
  const teams = generateTeams(500)
  const admin = generateAdmin()
  console.log("4. done")
  console.log("5. saving data")
  await AdminRepository.save(admin)
  const saved = teams.map((team) => TeamRepository.save(team))
  await Promise.all(saved)
  //await teamRepository.save(teams)
  console.log("6. done")

  process.exit()
})
