import {AuthenticationError} from "./AuthenticationError";
import {LoginError} from "./LoginError";
import {UserError} from "./UserError";
import {TeamsError} from "./TeamsError";
import {ReportsError} from "./ReportsError";
import {UnknownError} from "./UnknownError";
import {ReportDetailsError} from "./ReportDetailsError";

export type AllErrors =
  AuthenticationError |
  LoginError |
  UserError |
  TeamsError |
  ReportsError |
  UnknownError |
  ReportDetailsError