import {ErrorResponse, SuccessResponse} from "./Response";
import {AuthenticationError} from "../../error/AuthenticationError";

export type ValidateAuthenticationResponse = SuccessResponse<boolean> | ErrorResponse<AuthenticationError>