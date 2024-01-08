import { Service } from "typedi";
import {
  LoginRequest,
  ResponseStatus,
  SignupRequest,
  TokenData,
  UserPermissions,
} from "../types";
import { User as UserModel } from "../entity/User";
import bcrypt from "bcrypt";
import { getConnection } from "typeorm";
import logger from "../utils/logger";
import { APIError } from "../utils/APIError";
import jwt from "jsonwebtoken";

@Service()
export class UserService {
  async signupRequest(body: SignupRequest) {
    try {
      const queryRunner = getConnection().createQueryRunner();

      const newUser = new UserModel();
      newUser.name = body.name;
      newUser.email = body.email;
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(body.password, 10);
      newUser.password = hashedPassword;
      newUser.roles = [UserPermissions.admin];
      await queryRunner.manager.save(newUser);
      return true;
    } catch (error) {
      logger.error(error);
      throw new APIError(error.message);
    }
  }

  async login(obj: LoginRequest) {
    try {
      const queryRunner = getConnection().createQueryRunner();

      const ifUserExist = await queryRunner.manager
        .getRepository(UserModel)
        .findOne({
          where: [{ email: obj.email }],
          select: ["id", "name", "email", "password","roles"],
        });
      if (!ifUserExist) {
        throw new APIError("User doesn't exsist!", ResponseStatus.NOT_FOUND);
      }
      const isPasswordValid = bcrypt.compareSync(
        obj.password,
        ifUserExist.password
      );
      if (!isPasswordValid) {
        throw new APIError("Invalid password!", ResponseStatus.ERROR);
      }
      const tokenData: TokenData = {
        email: ifUserExist.email,
        id: ifUserExist.id,
      };
      var auth_token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "6 hours",
      });

      let user_details = {
        id: ifUserExist.id,
        name: ifUserExist.name,
        email: ifUserExist.email,
        roles: ifUserExist.roles,
      };

      return {token: auth_token, user: user_details};
    } catch (error) {
      logger.error(error);
      throw new APIError(error.message, ResponseStatus.ERROR);
    }
  }
}
