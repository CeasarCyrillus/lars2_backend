import {AllErrors} from "../../error/AllErrors";

export type success = "success"
export type error = "error"
export type SuccessResponse<TData> = {
  type: success,
  payload: TData
}

export type ErrorResponse<TError extends AllErrors> = {
  type: error,
  payload: TError
}

export type Response<TData, TError extends AllErrors> = SuccessResponse<TData> | ErrorResponse<TError>