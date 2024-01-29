import {Socket} from "socket.io";
import {EventName} from "../sharedTypes/socket/Socket";
import {ErrorResponse, SuccessResponse} from "../sharedTypes/socket/response/Response";
import {AllErrors} from "../sharedTypes/error/AllErrors";

export const withSuccess = (socket: Socket) => <T>(eventName: EventName, payload: T, trace: string) => {
  const response: SuccessResponse<T> = {type: "success", payload, trace: trace}
  console.log(`[${eventName}] [${response.trace}] success response`)
  socket.emit(eventName, response)
}

export const withError = (socket: Socket) => (eventName: EventName, payload: AllErrors, trace:string) => {
  const response: ErrorResponse<AllErrors> = {type: "error", payload, trace: trace}
  console.error(`[${eventName}] error response`, payload)
  socket.emit(eventName, response)
}