import {Socket} from "socket.io";
import {decode} from "jwt-simple";
import {authenticationError} from "../../lib/error";
import {MessageType, withFailure, withSuccess} from "../../lib/response";
import {AuthHeader} from "../../sharedTypes/AuthHeader";
import {User} from "../../Data/repositoryImplementation/UserRepository";
export const jwtSecretKey = "secret-key";

export const getAuthorizedUser = (authHeader: AuthHeader) => {
  try {
    return decode(authHeader.token, jwtSecretKey, false)
  } catch (e) {
    return false
  }
}

export const isAuthorized = (authHeader:AuthHeader) => {
  try {
    decode(authHeader.token, jwtSecretKey, false)
    return true
  } catch (e) {
    return false
  }
}

export const withAuthorization = (socket: Socket) => <T>(messageType: MessageType, getResponse: (user: User) => T | Promise<T>) => {
  const failure = withFailure(socket)
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