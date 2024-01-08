import {
  Authorized,
  Body,
  Controller,
  CurrentUser,
  Get,
  Params,
  Post,
  Put,
  QueryParams,
  Res,
} from "routing-controllers";
import {
  BookPublishRequest,
  ResponseStatus,
  SkipLimitURLParams,
} from "../types";
import { Inject, Service } from "typedi";
import logger from "../utils/logger";
import { Response } from "express";
import { BookService } from "../services/BookService";
import { User } from "../entity/User";

@Controller("/books")
@Service()
export class BooksController {
  constructor(@Inject() private bookService: BookService) {}

  @Authorized()
  @Post("/publish")
  async addBook(
    @Body() body: BookPublishRequest,
    @Res() res: Response,
    @CurrentUser() user: User
  ) {
    try {
      await this.bookService.addBook(body, user.id);
      return res.status(ResponseStatus.SUCCESS).send({
        status: true,
        message: "Successfully!",
      });
    } catch (error) {
      logger.log(error);
      return res.status(ResponseStatus.ERROR).send({
        status: false,
        message: "Something went wrong, try again later!",
      });
    }
  }

  @Authorized()
  @Get("/search")
  async getBooks(
    @QueryParams({ validate: true })
    query: {
      title: string;
    },
    @Res() res: Response
  ) {
    try {
      return await this.bookService.search(query.title);
    } catch (error) {
      return res.status(ResponseStatus.ERROR).send({
        status: false,
        message: "Something went wrong, try again later!",
      });
    }
  }

  @Authorized()
  @Put("/unpublish/:bookId")
  async unpublish(
    @Params({ validate: true }) { bookId }: { bookId: number },
    @Res() res: Response
  ) {
    try {
      await this.bookService.unPublished(bookId);
      return res.status(ResponseStatus.SUCCESS).send({
        status: true,
        message: "Book unpubished successfully!",
      });
    } catch (error) {
      return res.status(ResponseStatus.ERROR).send({
        status: false,
        message: "Something went wrong, try again!",
      });
    }
  }

  @Authorized()
  @Get("/user/:skip/:limit")
  async booksByUser(
    @CurrentUser() user: User,
    @Res() res: Response,
    @Params({ validate: true }) { skip, limit }: SkipLimitURLParams
  ) {
    try {
      const books = await this.bookService.userBooks(user.id, +skip, +limit);
      return res.status(ResponseStatus.SUCCESS).send(books);
    } catch (error) {
      return res.status(ResponseStatus.ERROR).send({
        status: false,
        message: "Something went wrong, try again later!",
      });
    }
  }

  @Authorized()
  @Get("/published/:skip/:limit")
  async publishedBooks(
    @Res() res: Response,
    @Params({ validate: true }) { skip, limit }: SkipLimitURLParams
  ) {
    try {
      const publishedBooks = await this.bookService.publishedBooks(
        +skip,
        +limit
      );

      return res.status(ResponseStatus.SUCCESS).send({
        status: true,
        message: "Fetched successfully!",
        data: publishedBooks,
      });
    } catch (error) {
      logger.error(error);
      return res.status(ResponseStatus.ERROR).send({
        status: false,
        message: "Something went wrong, try again later!",
      });
    }
  }
}
