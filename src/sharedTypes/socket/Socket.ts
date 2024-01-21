import {LoginDetails} from "../dto/LoginDetails";
import {Authentication} from "../dto/Authentication";
import {UserResponse} from "./response/UserResponse";
import {ValidateAuthenticationResponse} from "./response/ValidateAuthenticationResponse";
import {ReportsResponse} from "./response/ReportsResponse";
import {LoginResponse} from "./response/LoginResponse";
import {TeamsResponse} from "./response/TeamsResponse";

export type ServerToClientEvents = {
  user: (user: UserResponse) => void
  validateAuthentication: (isValid: ValidateAuthenticationResponse) => void
  reports: (reports: ReportsResponse) => void
  login: (authentication: LoginResponse) => void
  teams: (teams: TeamsResponse) => void,
  connect: () => void
}

export type ClientToServerEvents = {
  user: () => void
  validateAuthentication: (authentication: Authentication) => void
  reports: () => void
  login: (loginDetails: LoginDetails) => void
  teams: () => void
}

export type InterServerEvents = any

export interface SocketData {
  auth: Authentication
}

export type EventName = keyof ServerToClientEvents | "connect" | "connect_error"