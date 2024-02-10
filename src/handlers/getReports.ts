import {isAuthorized} from "../lib/jwt";
import {isLegalFilter} from "../lib/isLegalFilter";
import {mapReport} from "../sharedTypes/dto/ReportDTO";
import {withError, withSuccess} from "../lib/response";
import {ReportsRequest} from "../sharedTypes/socket/request/ReportsRequest";
import {Socket} from "socket.io";
import {ReportRepository} from "../data/repository/ReportRepository";
import {legalReportFilters} from "../sharedTypes/dto/filter/ReportFilter";

export const getReports = (socket: Socket) => async (request: ReportsRequest) => {
  const success = withSuccess(socket)
  const failure = withError(socket)
  if (!isAuthorized(socket.data.auth, ["admin"])) {
    return failure("getReports", "authenticationError", request.trace)
  }
  if (!isLegalFilter(request, legalReportFilters)) {
    return failure("getReports", "unknownFilterError", request.trace)
  }

  const queryResponse = await ReportRepository.filter(request.payload)
  success("getReports", {
    count: queryResponse.count,
    data: queryResponse.data.map(mapReport),
  }, request.trace)
}