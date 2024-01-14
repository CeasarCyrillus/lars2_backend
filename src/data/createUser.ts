import {UserEntity} from "./entity/UserEntity";

import {generateHash} from "../lib/password";
import {AppDataSource} from "./data-source";

const getNamedArg = (argName: string): string =>{
  const arg = process.argv
    .slice(2)
    .find(arg => arg.startsWith(`--${argName}=`))
  if(!arg) {
    throw new Error(`Arg not found '${argName}'`)
  }
  return arg.split("=")[1]

}
const username = getNamedArg("username")
const email = getNamedArg("email")
const name = getNamedArg("name")
const phone = getNamedArg("phone")
const password = getNamedArg("password")


AppDataSource.initialize().then(async () => {
  const repository = AppDataSource.getRepository(UserEntity)
  const user = new UserEntity()
  user.username = username
  user.email = email
  user.name = name
  user.phone = phone
  user.passwordHash = generateHash(password)
  user.role = "admin"

  await repository.save(user)
  console.log("User created!")
  console.log(JSON.stringify(user, null, 4))
  process.exit()
})