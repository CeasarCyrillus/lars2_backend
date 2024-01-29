import {ReportsError} from "../../error/ReportsError";
import {ReportDTO} from "../../dto/ReportDTO";
import {ErrorResponse, SuccessResponse} from "./Response";
import {QueryResponse} from "./QueryResponse";

export type ReportsResponse = SuccessResponse<QueryResponse<ReportDTO[]>> | ErrorResponse<ReportsError>
