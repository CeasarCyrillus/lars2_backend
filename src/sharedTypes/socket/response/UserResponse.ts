import {ErrorResponse, SuccessResponse} from "./Response";
import {UserError} from "../../error/UserError";
import {AdminDTO} from "../../dto/AdminDTO";

export type UserResponse = SuccessResponse<AdminDTO> | ErrorResponse<UserError>