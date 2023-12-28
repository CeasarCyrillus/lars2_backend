import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import cors from "cors"
import {encode} from "jwt-simple"
import {isAuthorized, jwtSecretKey, withAuthorization} from "./lib/jwt";
import {withError, withSuccess} from "./lib/response";
import {fakeReportDto1, fakeReportDto2, fakeReportDto3, fakeReportDto4, team, user} from "./fakeData";
import {Authentication} from "./sharedTypes/dto/Authentication";
import {
  ClientToServerEvents, EventName,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from "./sharedTypes/socket/Socket";
import {User} from "./sharedTypes/dto/User";

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
  console.log("CONNECTION!")
  const success = withSuccess(socket)
  const failure = withError(socket)
  const authorized = withAuthorization(socket)
  authorized(userEvent, (user) => {
    return {email: "email.com", name: user.name}
  })

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

  socket.on(loginEvent, (message) => {
    const user: User = {email: message.username + "@email.com", name: message.username}
    const token = encode(user, jwtSecretKey)
    const authHeader: Authentication = {token}
    socket.data.auth = authHeader
    success(loginEvent, authHeader)
  })
})


const port = 3001
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});


