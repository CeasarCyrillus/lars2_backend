import {AuthenticationError} from "./AuthenticationError";
import {LoginError} from "./LoginError";
import {UserError} from "./UserError";
import {TeamsError} from "./TeamsError";
import {ReportsError} from "./ReportsError";
import {UnknownError} from "./UnknownError";

export type AllErrors =
  AuthenticationError |
  LoginError |
  UserError |
  TeamsError |
  ReportsError |
  UnknownError