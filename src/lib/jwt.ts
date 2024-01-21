import {Socket} from "socket.io";
import {decode} from "jwt-simple";
import {withError, withSuccess} from "./response";
import {Authentication} from "../sharedTypes/dto/Authentication";
import {EventName} from "../sharedTypes/socket/Socket";
import {AdminDTO} from "../sharedTypes/dto/AdminDTO";

export const jwtSecretKey = "secret-key";
export type JwtPayload = AdminDTO

export const getAuthorizedUser = (authHeader: Authentication) => {
  try {
    return decode(authHeader.token, jwtSecretKey, false)
  } catch (e) {
    return false
  }
}

export const isAuthorized = (authHeader:Authentication) => {
  try {
    decode(authHeader.token, jwtSecretKey, false)
    return true
  } catch (e) {
    return false
  }
}

export const withAuthorization = (socket: Socket) => <T, Request>(
  messageType: EventName,
  getResponse: (request:{user: JwtPayload, request: Request}) => T | Promise<T>
) => {
  const failure = withError(socket)
  const success = withSuccess(socket)
  socket.on(messageType, async (request: Request) => {
    const user = getAuthorizedUser(socket.data.auth)
    if(user) {
      const response = await getResponse({user, request})
      success(messageType, response)
    } else {
      failure(messageType, "authenticationError")
    }
  })
}