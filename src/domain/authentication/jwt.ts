import {Socket} from "socket.io";
import {decode} from "jwt-simple";
import {authenticationError} from "../../lib/error";
import {User} from "./User";
import {withFailure} from "../../lib/response";
export const jwtSecretKey = "secret-key";

export const authenticated = (socket: Socket, token: string, withUser: (user: User) => void) => {
  const failure = withFailure(socket)
  try{
    const user = decode(token, jwtSecretKey, false)
    withUser(user)
  } catch (error){
    console.error(error)
    failure("authentication", authenticationError)
    socket.disconnect()
    return
  }
}