import {ErrorResponse, SuccessResponse} from "./Response";
import {TeamDTO} from "../../dto/TeamDTO";
import {TeamsError} from "../../error/TeamsError";

export type TeamsResponse = SuccessResponse<TeamDTO[]> | ErrorResponse<TeamsError>