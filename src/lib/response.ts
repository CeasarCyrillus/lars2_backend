import {Socket} from "socket.io";

export const Success = "Success"
export const Failure = "Failure"
export type Response<T> = {
  status: typeof Success | typeof Failure
  message?: T
}

type MessageType = "user" | "connection" | "authentication" | "reports"
export const withSuccess = (socket: Socket) => <T>(messageType: MessageType, message?: T) => {
  const response: Response<T> = message !== undefined ?
    {status: Success, message} :
    {status: Success}
  console.log("CC: with success:", messageType, message)
  socket.emit(messageType, response)
}

export const withFailure = (socket: Socket) => <T>(messageType: MessageType, message: T) => {
  const response: Response<T> = message !== undefined ?
    {status: Failure, message} :
    {status: Failure}
  socket.emit(messageType, response)
}