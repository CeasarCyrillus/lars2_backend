import {ErrorResponse, SuccessResponse} from "./Response";
import {User} from "../../dto/User";
import {UserError} from "../../error/UserError";

export type UserResponse = SuccessResponse<User> | ErrorResponse<UserError>