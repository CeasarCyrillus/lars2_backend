import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import cors from "cors"
import {encode} from "jwt-simple"
import {isAuthorized, JwtPayload, jwtSecretKey, withAuthorization} from "./lib/jwt";
import {withError, withSuccess} from "./lib/response";
import {fakeReportDto1, fakeReportDto2, fakeReportDto3, fakeReportDto4, team, user} from "./fakeData";
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
import {userRepository} from "./data/repository/userRepository";

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

io.on("connection", (socket) => {
  const success = withSuccess(socket)
  const failure = withError(socket)
  const authorized = withAuthorization(socket)
  authorized(userEvent, (user) => user)

  authorized(reportsEvent, () => {
    return [fakeReportDto1, fakeReportDto2, fakeReportDto3, fakeReportDto4];
  })

  authorized(teamsEvent, () => {
    return [team]
  })


  socket.on(validateAuthenticationEvent, (authHeader: Authentication) => {
    const authorized = isAuthorized(authHeader);
    if(authorized) {
      socket.data.auth = authHeader
    }
    success(validateAuthenticationEvent, authorized)
  })

  socket.on(loginEvent, async (loginDetails) => {
    const user = await userRepository.findOne({
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
      console.log("wrong password")
      failure(loginEvent, "incorrectPassword")
      return
    }

    const payload: JwtPayload = {
      email: user.email, id: user.id, phone: user.phone, username: user.username, name: user.name, role: user.role
    }

    const token = encode(payload, jwtSecretKey)
    const authHeader: Authentication = {token}
    socket.data.auth = authHeader
    success(loginEvent, authHeader)
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


