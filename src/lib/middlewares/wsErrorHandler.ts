import {Socket} from "socket.io";
import {unknownError} from "../error";

export const wsErrorHandler = (socket: Socket, message: string) => (handler) => {
  const handleError = (err) => {
    console.error(err);
    socket.emit(message, {result: "failure", error: unknownError})
  };

  return (...args) => {
    try {
      const ret = handler.apply(this, args);
      if (ret && typeof ret.catch === "function") {
        ret.catch(handleError);
      }
    } catch (e) {
      handleError(e);
    }
  };
};