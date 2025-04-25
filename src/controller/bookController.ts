import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "../types/type";
import {
  createBookRoute,
  deleteBookRoute,
  getBookRoute,
  updateBookRoute,
} from "../routes/bookRoute";
import { drizzle } from "drizzle-orm/d1";
import { books } from "../db/schema";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";

const bookController = new OpenAPIHono<Context>()
  .openapi(getBookRoute, async (c) => {
    const db = drizzle(c.env.DB);
    const Allbooks = await db.select().from(books).all();
    return c.json(Allbooks, 200);
  })
  .openapi(createBookRoute, async (c) => {
    const db = drizzle(c.env.DB);
    const bookData = c.req.valid("json");
    if (!bookData) {
      throw new HTTPException(400, { message: "Invalid book data" });
    }
    const [createBook] = await db
      .insert(books)
      .values({
        bookSourceId: bookData.bookSourceId,
        title: bookData.title,
        categoryId: bookData.categoryId,
      })
      .returning();

    return c.json(createBook, 201);
  })
  .openapi(updateBookRoute, async (c) => {
    const db = drizzle(c.env.DB);
    const bookData = c.req.valid("json");
    const bookID = c.req.param("id");

    if (!bookData) {
      throw new HTTPException(400, { message: "Invalid book data" });
    }

    const [updateBook] = await db
      .update(books)
      .set({
        title: bookData.title,
        bookSourceId: bookData.bookSourceId,
        categoryId: bookData.categoryId,
      })
      .where(eq(books.id, bookID))
      .returning();
    return c.json(updateBook, 200);
  })
  .openapi(deleteBookRoute, async (c) => {
    const db = drizzle(c.env.DB);
    const bookId = c.req.param("id");
    if (!bookId) {
      throw new HTTPException(400, { message: "Invalid book ID" });
    }
    const [deleteBook] = await db
      .delete(books)
      .where(eq(books.id, bookId))
      .returning();
    return c.json(deleteBook, 200);
  });
export { bookController };
