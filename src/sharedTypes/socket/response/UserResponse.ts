import {ErrorResponse, SuccessResponse} from "./Response";
import {AdminDTO} from "../../dto/AdminDTO";
import {UserError} from "../../error/UserError";

export type UserResponse = SuccessResponse<AdminDTO> | ErrorResponse<UserError>