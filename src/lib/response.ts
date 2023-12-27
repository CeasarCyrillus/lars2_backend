import {Socket} from "socket.io";
import {Response} from "../sharedTypes/socket/Response";
import {EventName} from "../sharedTypes/socket/Socket";

export const withSuccess = (socket: Socket) => <T>(eventName: EventName, payload: T) => {
  const response: Response<T> = {type: "success", payload}
  socket.emit(eventName, response)
}

export const withError = (socket: Socket) => <T>(eventName: EventName, payload: T) => {
  const response: Response<T> = {type: "success", payload}
  socket.emit(eventName, response)
}