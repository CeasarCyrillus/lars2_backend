import {LoginDetails} from "../dto/LoginDetails";
import {User} from "../dto/User";
import {Authentication} from "../dto/Authentication";
import {Report} from "../dto/Report";
import {Response} from "./Response";

export type ServerToClientEvents = {
  user: (user: Response<User>) => void
  validateAuthentication: (isValid: Response<boolean>) => void
  reports: (reports: Response<Report[]>) => void
  login: (authentication: Response<Authentication>) => void
}

export type ClientToServerEvents = {
  user: () => void
  validateAuthentication: (authentication: Authentication) => void
  reports: () => void
  login: (loginDetails: LoginDetails) => void
}

export type InterServerEvents = any

export interface SocketData {
  auth: Authentication
}

export type EventName = keyof ServerToClientEvents