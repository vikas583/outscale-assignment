import { BookPublishRequest, ResponseStatus } from "../types";
import { Service } from "typedi";
import { Books, Books as BooksModel } from "../entity/Books";
import { getConnection } from "typeorm";
import { APIError } from "../utils/APIError";

@Service()
export class BookService {
  async addBook(books: BookPublishRequest, userId: number) {
    const queryRunner = getConnection().createQueryRunner();
    const newBook = new BooksModel();
    newBook.name = books.name;
    newBook.title = books.title;
    newBook.isPublish = books.isPublish;
    newBook.userId = userId;
    await queryRunner.manager.save(newBook);
    return true;
  }

  async search(query: string) {
    const conn = getConnection();

    const qb = conn.getRepository(Books).createQueryBuilder("books");
    qb.where("books.title ilike :title", {
      title: `%${query}%`,
    });

    const total = await qb.clone().select("count(1) as count").getRawOne<{
      count: string;
    }>();

    const data = await qb.orderBy("books.createdAt", "DESC").getMany();

    return { total: +(total?.count || 0), data };
  }

  async unPublished(bookId: number) {
    const book = await getConnection().getRepository(Books).findOne({
      id: bookId,
    });

    if (!book) {
      throw new APIError("Book not found!", ResponseStatus.ERROR);
    }

    const updated = await getConnection().getRepository(Books).update(
      { id: bookId },
      {
        isPublish: false,
      }
    );

    if (updated) {
      return true;
    }
    throw new APIError(
      "SOmething went wrong, try again later!",
      ResponseStatus.ERROR
    );
  }
}
