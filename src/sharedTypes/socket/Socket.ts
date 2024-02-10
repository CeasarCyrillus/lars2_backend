import {Authentication} from "../dto/Authentication";
import {UserResponse} from "./response/UserResponse";
import {ValidateAuthenticationResponse} from "./response/ValidateAuthenticationResponse";
import {ReportsResponse} from "./response/ReportsResponse";
import {LoginResponse} from "./response/LoginResponse";
import {TeamsResponse} from "./response/TeamsResponse";
import {ReportsRequest} from "./request/ReportsRequest";
import {ValidateAuthenticationRequest} from "./request/ValidateAuthenticationRequest";
import {LoginRequest} from "./request/LoginRequest";
import {BaseRequest} from "./request/Request";
import {AllTeamsRequest} from "./request/AllTeamsRequest";

export type ServerToClientEvents = {
  user: (user: UserResponse) => void
  validateAuthentication: (isValid: ValidateAuthenticationResponse) => void
  getReports: (reports: ReportsResponse) => void
  login: (authentication: LoginResponse) => void
  getAllTeams: (teams: TeamsResponse) => void,
  connect: () => void
}

export type ClientToServerEvents = {
  user: () => void
  validateAuthentication: (request: ValidateAuthenticationRequest) => void
  getReports: (request: ReportsRequest) => void
  login: (request: LoginRequest) => void
  getAllTeams: (request: AllTeamsRequest) => void
}

export type InterServerEvents = any

export interface SocketData {
  auth: Authentication
}

export type EventName = keyof ServerToClientEvents | "connect" | "connect_error"