import {decode} from "jwt-simple";
import {Authentication} from "../sharedTypes/dto/Authentication";
import {UserRole} from "../sharedTypes/dto/UserRole";
export const jwtSecretKey = "secret-key";

const getAuthorizedUser = (authHeader: Authentication, roles: UserRole[]) => {
  try {

    const user = decode(authHeader.token, jwtSecretKey, false)
    if(roles.includes(user.role)) {
      return user
    }

    return false
  } catch (e) {
    return false
  }
}

export const isAuthorized = (authHeader: Authentication, roles: UserRole[]) => !!getAuthorizedUser(authHeader, roles)