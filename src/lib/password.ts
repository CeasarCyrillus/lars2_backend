import bcrypt from "bcrypt";
import {getConfig} from "../GetConfig";

export const generateHash = (password: string) => {
  const config = getConfig()
  return bcrypt.hashSync(password, config.passwordSaltRounds)
}

export const verifyPassword = (password: string, hash: string) =>
  bcrypt.compareSync(password, hash)