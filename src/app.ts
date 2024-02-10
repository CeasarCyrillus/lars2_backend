import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import cors from "cors"
import {encode} from "jwt-simple"
import {isAuthorized, jwtSecretKey} from "./lib/jwt";
import {withError, withSuccess} from "./lib/response";
import {Authentication} from "./sharedTypes/dto/Authentication";
import {
  ClientToServerEvents,
  EventName,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from "./sharedTypes/socket/Socket";
import "reflect-metadata"
import {AppDataSource} from "./data/data-source";
import {verifyPassword} from "./lib/password";
import {getConfig} from "./GetConfig";
import {createMap} from "@automapper/core";
import {mapper} from "./sharedTypes/dto/mapper";
import {AdminEntity} from "./data/entity/AdminEntity";
import {AdminDTO} from "./sharedTypes/dto/AdminDTO";
import {ReportEntity} from "./data/entity/ReportEntity";
import {ReportDTO} from "./sharedTypes/dto/ReportDTO";
import {TeamEntity} from "./data/entity/TeamEntity";
import {mapTeam, TeamDTO} from "./sharedTypes/dto/TeamDTO";
import {getReports} from "./handlers/getReports";
import {getAllTeams} from "./handlers/getAllTeams";
import {TeamRepository} from "./data/repository/TeamRepository";
import {AdminRepository} from "./data/repository/AdminRepository";
import {login} from "./handlers/login";
import {validateAuthentication} from "./handlers/validateAuthentication";

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

createMap(mapper, AdminEntity, AdminDTO)
createMap(mapper, TeamEntity, TeamDTO)
createMap(mapper, ReportEntity, ReportDTO)


io.on("connection", (socket) => {
  socket.on("getReports", getReports(socket))
  socket.on("getAllTeams", getAllTeams(socket))
  socket.on("login", login(socket))
  socket.on("validateAuthentication", validateAuthentication(socket))
})


const port = 3001
AppDataSource.initialize().then(() => {
  const config = getConfig()
  console.log(`database running on port ${config.database.port}`)
  server.listen(port,  () => {
    console.log(`server running at http://localhost:${port}`);
  });
})
