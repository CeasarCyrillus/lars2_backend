import {Socket} from "socket.io";
import {isAuthorized} from "../lib/jwt";
import {mapTeam} from "../sharedTypes/dto/TeamDTO";
import {AllTeamsRequest} from "../sharedTypes/socket/request/AllTeamsRequest";
import {withError, withSuccess} from "../lib/response";
import {TeamRepository} from "../data/repository/TeamRepository";

export const getAllTeams = (socket: Socket) => async (request: AllTeamsRequest) => {
  const success = withSuccess(socket)
  const failure = withError(socket)
  if (!isAuthorized(socket.data.auth, ["admin"])) {
    return failure("getAllTeams", "authenticationError", request.trace)
  }

  const teams = await TeamRepository.find({})

  success("getAllTeams", teams.map(mapTeam), request.trace)
}