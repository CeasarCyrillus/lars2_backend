import {ErrorResponse, SuccessResponse} from "./Response";
import {Team} from "../../dto/Team";
import {TeamsError} from "../../error/TeamsError";

export type TeamsResponse = SuccessResponse<Team[]> | ErrorResponse<TeamsError>