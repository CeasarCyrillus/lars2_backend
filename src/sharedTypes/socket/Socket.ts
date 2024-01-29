import {Authentication} from "../dto/Authentication";
import {UserResponse} from "./response/UserResponse";
import {ValidateAuthenticationResponse} from "./response/ValidateAuthenticationResponse";
import {ReportsResponse} from "./response/ReportsResponse";
import {LoginResponse} from "./response/LoginResponse";
import {TeamsResponse} from "./response/TeamsResponse";
import {ReportsRequest} from "./request/ReportsRequest";
import {ValidateAuthenticationRequest} from "./request/ValidateAuthenticationRequest";
import {LoginRequest} from "./request/LoginRequest";

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
  validateAuthentication: (request: ValidateAuthenticationRequest) => void
  reports: (request: ReportsRequest) => void
  login: (request: LoginRequest) => void
  teams: () => void
}

export type InterServerEvents = any

export interface SocketData {
  auth: Authentication
}

export type EventName = keyof ServerToClientEvents | "connect" | "connect_error"