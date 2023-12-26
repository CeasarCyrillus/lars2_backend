import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from "cors"
import {encode} from "jwt-simple"
import {isAuthorized, jwtSecretKey, withAuthorization} from "./domain/authentication/jwt";
import {withFailure, withSuccess} from "./lib/response";
import {fakeReportDto1, fakeReportDto2, fakeReportDto3, fakeReportDto4, report} from "./fakeData";
import {AuthHeader} from "./sharedTypes/AuthHeader";

const app = express();
app.use(express.json())
app.use(cors())

const server = createServer(app);

const io = new Server(server, {cors: {
  origin: "http://localhost:3000"
  }});



io.on("connection", (socket) => {
  const success = withSuccess(socket)
  const failure = withFailure(socket)
  const authorized = withAuthorization(socket)
  authorized("user", (user) => {
    return {email: "email.com", name: user.name}
  })

  authorized("reports", (user) => {
    return [fakeReportDto1, fakeReportDto2, fakeReportDto3, fakeReportDto4];
  })

  socket.on("validateAuthentication", (authHeader: AuthHeader) => {
    const authorized = isAuthorized(authHeader);
    if(authorized) {
      socket.data.auth = authHeader
    }
    success("validateAuthentication", authorized)
  })

  socket.on("login", (message) => {
    const user = {username: message.username}
    const token = encode(user, jwtSecretKey)
    const authHeader: AuthHeader = {token}
    socket.data.auth = authHeader
    const error = {message: "authenticationFailed"}
    success("login", authHeader)
  })
})

const port = 3001
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});


