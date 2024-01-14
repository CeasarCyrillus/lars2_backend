import {ErrorResponse, SuccessResponse} from "./Response";
import {ReportsError} from "../../error/ReportsError";
import {Report} from "../../dto/Report";

export type ReportsResponse = SuccessResponse<Report[]> | ErrorResponse<ReportsError>