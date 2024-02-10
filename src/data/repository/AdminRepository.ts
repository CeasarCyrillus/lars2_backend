import {AppDataSource} from "../data-source";
import {AdminEntity} from "../entity/AdminEntity";
import {LoginDetails} from "../../sharedTypes/dto/LoginDetails";

export const AdminRepository = AppDataSource.getRepository(AdminEntity).extend({
    findUser: (loginDetails: LoginDetails) => AppDataSource.getRepository(AdminEntity).findOne({
    where: [
      {username: loginDetails.username},
      {email: loginDetails.username}
    ]
  })
})