import {Socket} from "socket.io";
import {EventName} from "../sharedTypes/socket/Socket";
import {ErrorResponse, SuccessResponse} from "../sharedTypes/socket/response/Response";
import {AllErrors} from "../sharedTypes/error/AllErrors";

export const withSuccess = (socket: Socket) => <T>(eventName: EventName, payload: T) => {
  const response: SuccessResponse<T> = {type: "success", payload}
  console.log(`[${eventName}] success response`)
  socket.emit(eventName, response)
}

export const withError = (socket: Socket) => (eventName: EventName, payload: AllErrors) => {
  const response: ErrorResponse<AllErrors> = {type: "error", payload}
  console.error(`[${eventName}] error response`, payload)
  socket.emit(eventName, response)
}