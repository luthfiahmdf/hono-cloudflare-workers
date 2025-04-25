import { createRoute } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { booksSchema, paramsBooksSchema } from "../schemas/book";

const getBookRoute = createRoute({
  method: "get",
  path: "/book",
  responses: {
    "200": jsonContent(booksSchema.array(), "List of books"),
  },
});
const createBookRoute = createRoute({
  method: "post",
  path: "/book",
  request: {
    body: jsonContentRequired(
      booksSchema.omit({ id: true, createdAt: true, updatedAt: true }),
      "Create book"
    ),
  },
  responses: {
    "200": jsonContent(booksSchema, "Book created"),
  },
});
const updateBookRoute = createRoute({
  method: "patch",
  path: "/book",
  request: {
    body: jsonContentRequired(
      booksSchema.omit({ createdAt: true, updatedAt: true }),
      "Update book"
    ),
  },
  responses: {
    "200": jsonContent(booksSchema, "Book updated"),
  },
});
const deleteBookRoute = createRoute({
  method: "delete",
  path: "/book/:id",
  request: {
    params: paramsBooksSchema,
  },
  responses: {
    "200": jsonContent(booksSchema, "Book deleted"),
  },
});
export { getBookRoute, createBookRoute, updateBookRoute, deleteBookRoute };
