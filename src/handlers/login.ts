import {Socket} from "socket.io";
import {AdminRepository} from "../data/repository/AdminRepository";
import {verifyPassword} from "../lib/password";
import {encode} from "jwt-simple";
import {jwtSecretKey} from "../lib/jwt";
import {Authentication} from "../sharedTypes/dto/Authentication";
import {LoginRequest} from "../sharedTypes/socket/request/LoginRequest";
import {withError, withSuccess} from "../lib/response";

export const login = (socket: Socket) => async (request: LoginRequest) => {
  const success = withSuccess(socket)
  const failure = withError(socket)
  const {payload: loginDetails} = request
  const user = await AdminRepository.findUser(loginDetails)

  if (!user) {
    return failure("login", "incorrectUsername", request.trace)
  }

  if (!verifyPassword(loginDetails.password, user.passwordHash)) {
    return failure("login", "incorrectPassword", request.trace)
  }

  const token = encode(user, jwtSecretKey)
  const authHeader: Authentication = {token}
  socket.data.auth = authHeader
  success("login", authHeader, request.trace)
}