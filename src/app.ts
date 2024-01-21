import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import cors from "cors"
import {encode} from "jwt-simple"
import {isAuthorized, JwtPayload, jwtSecretKey, withAuthorization} from "./lib/jwt";
import {withError, withSuccess} from "./lib/response";
import {Authentication} from "./sharedTypes/dto/Authentication";
import {
  ClientToServerEvents, EventName,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from "./sharedTypes/socket/Socket";
import "reflect-metadata"
import {AppDataSource} from "./data/data-source";
import {verifyPassword} from "./lib/password";
import {getConfig} from "./GetConfig";
import {adminRepository, reportRepository, teamRepository} from "./data/entity/repository";
import {createMap} from "@automapper/core";
import {mapper} from "./sharedTypes/dto/mapper";
import {AdminEntity} from "./data/entity/AdminEntity";
import {AdminDTO} from "./sharedTypes/dto/AdminDTO";
import {AutoMap} from "@automapper/classes";
import {Column, Entity} from "typeorm";
import {ReportEntity} from "./data/entity/ReportEntity";
import {mapReport, ReportDTO} from "./sharedTypes/dto/ReportDTO";
import {TeamEntity} from "./data/entity/TeamEntity";
import {mapTeam, TeamDTO} from "./sharedTypes/dto/TeamDTO";

const app = express();
app.use(express.json())
app.use(cors())

const server = createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
  >(server, {cors: {
    origin: "http://localhost:3000"
  }});

const userEvent: EventName = "user"
const validateAuthenticationEvent: EventName = "validateAuthentication"
const reportsEvent: EventName = "reports"
const loginEvent: EventName = "login"
const teamsEvent: EventName = "teams"


createMap(mapper, AdminEntity, AdminDTO)
createMap(mapper, TeamEntity, TeamDTO)
createMap(mapper, ReportEntity, ReportDTO)


io.on("connection", (socket) => {
  console.log("CC: connection!")
  const success = withSuccess(socket)
  const failure = withError(socket)
  const authorized = withAuthorization(socket)

  authorized(userEvent, ({user}) => user)

  authorized(reportsEvent, async () => {
    const reports = await reportRepository.find({relations: {team: true}})

    return reports.map(mapReport);
  })

  authorized(teamsEvent, async () => {
    const teams = await teamRepository.find({})
    return teams.map(mapTeam)
  })

  socket.on(loginEvent, async (loginDetails) => {
    const user = await adminRepository.findOne({
      where: [
        {username: loginDetails.username},
        {email: loginDetails.username}
      ]
    })

    if(!user) {
      failure(loginEvent, "incorrectUsername")
      return
    }

    if(!verifyPassword(loginDetails.password, user.passwordHash)){
      failure(loginEvent, "incorrectPassword")
      return
    }

    const token = encode(user, jwtSecretKey)
    const authHeader: Authentication = {token}
    socket.data.auth = authHeader
    success(loginEvent, authHeader)
  })

  socket.on(validateAuthenticationEvent, (authHeader: Authentication) => {
    const authorized = isAuthorized(authHeader);
    if(authorized) {
      socket.data.auth = authHeader
    }
    success(validateAuthenticationEvent, authorized)
  })
})


const port = 3001
AppDataSource.initialize().then(() => {
  const config = getConfig()
  console.log(`database running on port ${config.database.port}`)
  server.listen(port,  () => {
    console.log(`server running at http://localhost:${port}`);
  });
})


