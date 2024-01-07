import {
  Body,
  Controller,
  CurrentUser,
  Get,
  Post,
  Res,
} from "routing-controllers";
import { User } from "../entity/User";
import { ResponseStatus, SignupRequest } from "../types";
import logger from "../utils/logger";
import { Response } from "express";
import { Inject, Service } from "typedi";
import { UserService } from "../services/UserService";

@Controller("/auth")
@Service()
export class AuthController {
  constructor(
    @Inject()
    private userService: UserService
  ) {}
  @Post("/login")
  async login(
    @Res() res: Response,
    @Body() body: { email: string; password: string }
  ) {
    try {
      const data = await this.userService.login(body);
      return res
        .status(ResponseStatus.SUCCESS)
        .json({ status: true, message: "Logged in successfully!", data });
    } catch (error) {
      logger.error(error);
      return res.status(ResponseStatus.ERROR).json({
        message: "Cannot login. Please try later!",
      });
    }
  }

  @Post("/sign-up")
  async signUp(@Res() res: Response, @Body() body: SignupRequest) {
    try {
      await this.userService.signupRequest(body);
      return res.status(ResponseStatus.SUCCESS).json({
        status: true,
        message: "User registered successfully!",
      });
    } catch (error) {
      logger.error(error);
      return res.status(ResponseStatus.ERROR).json({
        message: "Something went wrong, try again later!!",
      });
    }
  }

  @Get("/me")
  async me(@CurrentUser({ required: true }) user: User) {
    return user;
  }

  @Get("/logout")
  async logout() {
    return true;
  }
}
