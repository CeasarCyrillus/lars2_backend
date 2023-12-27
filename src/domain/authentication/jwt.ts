import {Socket} from "socket.io";
import {decode} from "jwt-simple";
import {authenticationError} from "../../lib/error";
import {withError, withSuccess} from "../../lib/response";
import {Authentication} from "../../sharedTypes/dto/Authentication";
import {User} from "../../sharedTypes/dto/User";
import {EventName} from "../../sharedTypes/socket/Socket";

export const jwtSecretKey = "secret-key";

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

export const withAuthorization = (socket: Socket) => <T>(messageType: EventName, getResponse: (user: User) => T | Promise<T>) => {
  const failure = withError(socket)
  const success = withSuccess(socket)
  socket.on(messageType, async () => {
    const user = getAuthorizedUser(socket.data.auth)
    if(user) {
      const response = await getResponse(user)
      success(messageType, response)
    } else {
      failure(messageType, authenticationError)
    }
  })
}