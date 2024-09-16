import {AppDataSource} from "../data-source";
import {TeamEntity} from "../entity/TeamEntity";
import {faker} from "@faker-js/faker";
import {ReportEntity} from "../entity/ReportEntity";
import {generateHash} from "../../lib/password";
import {AdminEntity} from "../entity/AdminEntity";
import moment from "moment";
import {ReportRepository} from "../repository/ReportRepository";
import {TeamRepository} from "../repository/TeamRepository";
import {AdminRepository} from "../repository/AdminRepository";
import {EventEntity} from "../entity/EventEntity";
import {PlaceEntity} from "../entity/PlaceEntity";
import {EventRepository} from "../repository/EventRepository";
import {PlaceRepository} from "../repository/PlaceRepository";

faker.seed(1118112)
const today = new Date("2024-03")
const yearsAgo = new Date("2015-01")

const range = (amount: number) => [...new Array(amount)].map((_, index) => index)
const minuteIncrements = 10
const minutes = range(6).map(i => i * minuteIncrements)
const maxDurationHours = 3
const maxDurationMinutes = maxDurationHours * 60
const numberOfDurations = maxDurationMinutes / minuteIncrements
const durations = range(numberOfDurations).map(minute => minute * minuteIncrements)

const generateTeam = () => {
  const team = new TeamEntity()
  team.name = `${faker.color.human()} ${faker.company.buzzNoun()} IF ${faker.number.int({min: 0, max: 500})}`
  team.volunteers = generateVolunteers(faker.number.int({min: 1, max: 5}))
  return team
}

const generateReports = (amount: number) => range(amount).map(generateReport)
const generateReport = () => {
  const report = new ReportEntity()
  report.report_date = moment(faker.date.between({from: yearsAgo, to: today})).format("YYYY-MM")
  report.period = moment(faker.date.between({from: yearsAgo, to: today})).format("YYYY-MM")
  report.revision = faker.number.int({min: 0, max:4})
  report.note = faker.helpers.arrayElement([faker.lorem.text(), undefined, undefined])
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
  admin.phone = faker.helpers.fromRegExp(/[1-9][0-9]{10,12}/)
  admin.role = "admin"
  return admin
}

const generateVolunteer = () => {
  const reporter = new AdminEntity()
  reporter.passwordHash = "pwd"
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  reporter.name = `${firstName} ${lastName}`
  reporter.username = faker.internet.userName({firstName, lastName})
  reporter.email = faker.internet.email({firstName, lastName})
  reporter.phone = faker.helpers.fromRegExp(/[1-9][0-9]{10,12}/)
  reporter.role = faker.helpers.arrayElement(["volunteer", "admin"])
  return reporter
}

const generatePlaces = (amount: number) => range(amount).map(generatePlace)
const generatePlace = () => {
  const place = new PlaceEntity()
  place.name = faker.location.city()
  place.city = faker.location.city()
  place.postalCode = faker.location.zipCode()
  place.address = faker.location.streetAddress({useFullAddress: false})
  place.comment = faker.helpers.arrayElement([undefined, undefined, faker.lorem.text()])
  return place
}

const generateEvents = (amount: number) => range(amount).map(generateEvent)
const generateEvent = () => {
  const event = new EventEntity()
  const createdAt = moment(faker.date.between({from: yearsAgo, to: today}));
  const updatedAt = moment(faker.date.between({from: createdAt.toDate(), to: today}));
  event.created_at = createdAt.toDate()
  event.updated_at = updatedAt.toDate()

  const duration = faker.helpers.arrayElement(durations)
  const fromMinutes = faker.helpers.arrayElement(minutes)
  const from = moment(createdAt.minutes(fromMinutes)).seconds(0).milliseconds(0)
  const to = from.clone().add(duration, "minutes")
  event.from = from.toDate()
  event.to = to.toDate()

  event.note = faker.helpers.arrayElement([faker.lorem.text(), undefined, undefined])

  return event
}


const generateVolunteers = (amount: number) => range(amount).map(generateVolunteer)

AppDataSource.initialize().then(async (db) => {
  await db.dropDatabase()
  await db.destroy()
  AppDataSource.initialize().then(async () => {
    console.log("1. clearing database...")
    console.log("2. done")
    console.log("3. generating data")
    const team = generateTeam()
    const places = generatePlaces(faker.number.int({min: 3, max: 12}))
    const volunteers = generateVolunteers(faker.number.int({min: 1, max: 5}))
    const events = generateEvents(faker.number.int({min: 52, max: 250}))

    console.log("Saving Places")
    await PlaceRepository.save(places)
    console.log("Saving Volunteers")
    await AdminRepository.save(volunteers)

    for (const event of events) {
      event.reporter = faker.helpers.arrayElement(volunteers)
      event.place = faker.helpers.arrayElement(places)
    }

    console.log("Saving Events")
    await EventRepository.save(events)
    const reports = generateReports(12)
    do {
      for (const report of reports) {
        const eventsForReport = range(faker.number.int({min: 1, max: 4}))
          .map(() => events.pop())
          .filter(isEvent)

        report.events = [...eventsForReport, ...(report.events ?? [])]
      }
    } while (events.length > 0)

    console.log("Saving Reports")
    await ReportRepository.save(reports)

    team.volunteers = volunteers
    team.places = places
    team.reports = reports

    console.log("Saving Team")
    await TeamRepository.save(team)
    console.log("4. done")


    //const teams = [team]
    //await Promise.all(teams.map((team) => TeamRepository.save(team)))
    console.log("6. done")

    process.exit()
  })
})

const isEvent = (candidate: EventEntity | undefined): candidate is EventEntity => candidate !== undefined