import {Socket} from "socket.io";
import {withError, withSuccess} from "../lib/response";
import {isAuthorized} from "../lib/jwt";
import {reportQueryBuilder, ReportRepository} from "../data/repository/ReportRepository";
import {ReportDetailsRequest} from "../sharedTypes/socket/request/ReportDetailsRequest";
import {mapReportDetails} from "../sharedTypes/dto/ReportDetailsDTO";

export const getReportDetails = (socket: Socket) => async (request: ReportDetailsRequest) => {
  const success = withSuccess(socket)
  const failure = withError(socket)
  if (!isAuthorized(socket.data.auth, ["admin"])) {
    return failure("getReportDetails", "authenticationError", request.trace)
  }


  const report = await ReportRepository.findOne({
    where: {id: request.payload.id},
    relations: {
      team: {reporters: true},
      reporter: true
    }
  })

  if(report === null){
    return failure("getReportDetails", "unknownReport", request.trace)
  }
  success("getReportDetails", mapReportDetails(report), request.trace)
}