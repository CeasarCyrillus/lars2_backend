import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from "cors"
import {encode, decode} from "jwt-simple"
import {errorHandler} from "./lib/middlewares/errorHandler";
import {authenticated, jwtSecretKey} from "./domain/authentication/jwt";
import {withFailure, withSuccess} from "./lib/response";
import {fakeReportDto1, fakeReportDto2, fakeReportDto3, fakeReportDto4, report} from "./fakeData";

const app = express();
app.use(express.json())
app.use(cors())

const server = createServer(app);

const io = new Server(server, {cors: {
  origin: "http://localhost:3000"
  }});



io.on("connection", (socket) => {
  console.log("CONNECTION")
  const success = withSuccess(socket)
  const failure = withFailure(socket)
  socket.onAny(console.log)
  socket.on("user", () => {
    success("user", {email: "email", name: "name"})
  })

  socket.on("authentication", (msg) => {
    success("authentication", true)
  })

  socket.on("reports", (msg) => {
    success("reports", [fakeReportDto1, fakeReportDto2, fakeReportDto3, fakeReportDto4])
  })

})

app.post("/login", (request, res) => {
  // TODO: get user
  const user = {name: request.body.email, email: request.body.email}
  const token = encode(user, jwtSecretKey)
  const data = {token}
  const error = {message: "authenticationFailed"}
  res.send({result: "success", data: data})
})

app.use(errorHandler);

const port = 3001
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});


