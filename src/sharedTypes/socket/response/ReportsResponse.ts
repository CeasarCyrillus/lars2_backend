import {ErrorResponse, SuccessResponse} from "./Response";
import {ReportsError} from "../../error/ReportsError";
import {ReportDTO} from "../../dto/ReportDTO";

export type ReportsResponse = SuccessResponse<ReportDTO[]> | ErrorResponse<ReportsError>