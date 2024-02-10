import {Socket} from "socket.io";
import {isAuthorized} from "../lib/jwt";
import {ValidateAuthenticationRequest} from "../sharedTypes/socket/request/ValidateAuthenticationRequest";
import {withError, withSuccess} from "../lib/response";

export const validateAuthentication = (socket: Socket) => (request: ValidateAuthenticationRequest) => {
  const success = withSuccess(socket)
  const failure = withError(socket)
  const {payload: authHeader} = request
  const authorized = isAuthorized(authHeader, ["admin", "reporter"]);
  if(authorized) {
    socket.data.auth = authHeader
    success("validateAuthentication", authorized, request.trace)
  } else {
    failure("validateAuthentication", "authenticationError", request.trace)
  }
}