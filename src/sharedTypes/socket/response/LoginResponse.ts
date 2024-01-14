import {ErrorResponse, SuccessResponse} from "./Response";
import {Authentication} from "../../dto/Authentication";
import {LoginError} from "../../error/LoginError";

export type LoginResponse = SuccessResponse<Authentication> | ErrorResponse<LoginError>