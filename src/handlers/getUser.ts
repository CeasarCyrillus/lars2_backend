import {Socket} from "socket.io";
import {withError, withSuccess} from "../lib/response";
import {isAuthorized} from "../lib/jwt";

import {ReportDetailsRequest} from "../sharedTypes/socket/request/ReportDetailsRequest";
import {mapAdminUser} from "../sharedTypes/dto/AdminDTO";
import {AdminRepository} from "../data/repository/AdminRepository";

export const getUser = (socket: Socket) => async (request: ReportDetailsRequest) => {
  const success = withSuccess(socket)
  const failure = withError(socket)
  if (!isAuthorized(socket.data.auth, ["admin"])) {
    return failure("getUser", "authenticationError", request.trace)
  }


  const user = await AdminRepository.findOne({
    where: {id: request.payload.id}
  })

  if(user === null){
    return failure("getUser", "unknownReport", request.trace)
  }
  success("getUser", mapAdminUser(user), request.trace)
}