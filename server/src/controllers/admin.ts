import {
  Authorized,
  Body,
  Controller,
  CurrentUser,
  Delete,
  Get,
  Params,
  Patch,
  Post,
} from "routing-controllers";
import { Service } from "typedi";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import {
  AdminSearchParams,
  CreateUserRequest,
  DeleteUserRequest,
  SkipLimitURLParams,
  UserPermissions,
} from "../types";
import { APIError } from "../utils/APIError";
import { areArraysEqual } from "../utils/arraysEqual";
import logger from "../utils/logger";
import { sanitizeString } from "../utils/sanitizeString";

@Controller("/admin")
@Service()
@Authorized(UserPermissions.admin)
export class AdminController {
  @Get("/users/:skip/:limit")
  async users(@Params({ validate: true }) { skip, limit }: SkipLimitURLParams) {
    try {
      const repo = getConnection().getRepository(User);
      const users = await repo.find({
        select: ["id", "name", "roles", "email", "createdAt"],
        order: {
          id: "ASC",
        },
        skip: +skip,
        take: +limit,
      });
      const total = await repo.count();

      return {
        data: users,
        total,
      };
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  @Delete("/deleteUser")
  async deleteUser(
    @Body() { id }: DeleteUserRequest // @CurrentUser() user: User
  ) {
    try {
      const userRepo = getConnection().getRepository(User);
      const delUser = await userRepo.findOneOrFail({
        id,
      });
      if (delUser.roles.includes(UserPermissions.admin)) {
        throw new APIError("Cannot delete user", 400);
      }
      await userRepo.delete({ id });
      return true;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  @Patch("/updateUser")
  async updateUser(
    @Body()
    { id, name, roles, email }: Pick<User, "id" | "name" | "roles" | "email">,
    @CurrentUser() user: User
  ) {
    try {
      const userRepo = getConnection().getRepository(User);
      const updateUser = await userRepo.findOneOrFail({
        id,
      });
      if (
        updateUser.roles.includes(UserPermissions.admin) &&
        user.id !== updateUser.id
      ) {
        throw new APIError("You cannot update another admin user.", 400);
      }
      let updates: Record<string, any> = {};
      if (name && updateUser.name !== name) {
        updates.name = name;
      }
      if (email && updateUser.email !== email) {
        // new email must be unique
        const isEmailTaken = !!(await userRepo.findOne({ email }));
        if (isEmailTaken) {
          throw new APIError(
            "This email is already taken. Please use a different one.",
            400
          );
        }
        updates.email = email.toLowerCase();
      }
      if (!areArraysEqual(updateUser.roles, roles)) {
        updates.roles = roles;
      }
      if (Object.keys(updates).length > 0) {
        await userRepo
          .createQueryBuilder()
          .update(User)
          .set(updates)
          .where("id = :id", { id })
          .execute();
      }
      return {
        error: false,
        msg: "",
      };
    } catch (error) {
      let msg: string | undefined;
      if (error instanceof APIError) {
        msg = error.msg;
      }
      if (!msg) {
        msg = "Something went wrong. Please contact admin.";
      }
      logger.error(error);
      return {
        error: true,
        msg,
      };
    }
  }

  @Post("/createUser")
  async createUser(
    @Body()
    { name, roles, email }: CreateUserRequest
  ) // @CurrentUser() user: User
  {
    try {
      const userRepo = getConnection().getRepository(User);
      const isEmailTaken = !!(await userRepo.findOne({ email }));
      if (isEmailTaken) {
        throw new APIError(
          "This email is already taken. Please use a different one.",
          429
        );
      }
      if (roles.includes(UserPermissions.admin)) {
        throw new APIError("You cannot assign admin roles.", 400);
      }
      const newUser = new User();
      newUser.name = name;
      newUser.email = email.toLowerCase();
      newUser.roles = roles;

      await userRepo.save(newUser);
      return {
        error: false,
        msg: "",
      };
    } catch (error) {
      let msg: string | undefined;
      if (error instanceof APIError) {
        msg = error.msg;
      }
      if (!msg) {
        msg = "Something went wrong. Please contact admin.";
      }
      logger.error(error);
      return {
        error: true,
        msg,
      };
    }
  }

  @Get("/headerCardData")
  async count() {
    const total = await getConnection().getRepository(User).count();
    return {
      total,
    };
  }

  @Get("/search/:name/:skip/:limit")
  async search(
    @Params({ validate: true }) { name, skip, limit }: AdminSearchParams
  ) {
    const sanitizedName = sanitizeString(name);

    if (!sanitizedName.length) {
      return {
        users: [],
        total: 0,
      };
    }
    const qb = await getConnection()
      .createQueryBuilder(User, "user")
      .where("user.name ilike :name", {
        name: `%${sanitizedName}%`,
      });
    const total = await qb.getCount();
    const users = await qb.skip(+skip).take(+limit).getMany();
    return {
      users,
      total,
    };
  }
}
