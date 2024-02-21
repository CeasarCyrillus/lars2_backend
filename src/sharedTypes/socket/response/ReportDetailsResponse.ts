import {ErrorResponse, SuccessResponse} from "./Response";
import {ReportDetailsDTO} from "../../dto/ReportDetailsDTO";
import {ReportDetailsError} from "../../error/ReportDetailsError";

export type ReportDetailsResponse = SuccessResponse<ReportDetailsDTO> | ErrorResponse<ReportDetailsError>