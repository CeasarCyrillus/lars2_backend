import {Socket} from "socket.io";

export const Success = "Success"
export const Failure = "Failure"
export type Response<T> = {
  status: typeof Success | typeof Failure
  message?: T
}

export type MessageType = "user" | "connection" | "reports" | "login" | "validateAuthentication"
export const withSuccess = (socket: Socket) => <T>(messageType: MessageType, message?: T) => {
  const response: Response<T> = message !== undefined ?
    {status: Success, message} :
    {status: Success}
  socket.emit(messageType, response)
}

export const withFailure = (socket: Socket) => <T>(messageType: MessageType, error?: T) => {
  const response: Response<T> = error !== undefined ?
    {status: Failure, message: error} :
    {status: Failure}
  socket.emit(messageType, response)
}