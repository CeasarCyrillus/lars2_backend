import {Socket} from "socket.io";
import {decode} from "jwt-simple";
import {withError, withSuccess} from "./response";
import {Authentication} from "../sharedTypes/dto/Authentication";
import {EventName} from "../sharedTypes/socket/Socket";
import {AdminDTO} from "../sharedTypes/dto/AdminDTO";
import {BaseRequest} from "../sharedTypes/socket/request/Request";

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


export const withAuthorization = (socket: Socket) => <T>(
  messageType: EventName,
  getResponse: (request:{user: JwtPayload, request: BaseRequest<T>}) => any | Promise<any>
) => {
  const failure = withError(socket)
  const success = withSuccess(socket)
  socket.on(messageType, async (request: BaseRequest<T>) => {
    const user = getAuthorizedUser(socket.data.auth)
    if(user) {
      const response = await getResponse({user, request})
      success(messageType, response, request.trace)
    } else {
      failure(messageType, "authenticationError", request.trace)
    }
  })
}