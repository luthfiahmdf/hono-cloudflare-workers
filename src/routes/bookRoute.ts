import { createRoute } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { booksSchema, paramsBooksSchema } from "../schemas/book";
import { errorSchema } from "../schemas/globalSchema";

const getBookRoute = createRoute({
  method: "get",
  path: "",
  responses: {
    200: jsonContent(booksSchema.array(), "List of books"),
  },
});
const createBookRoute = createRoute({
  method: "post",
  path: "",
  request: {
    body: jsonContentRequired(
      booksSchema.omit({ id: true, createdAt: true, updatedAt: true }),
      "Create book"
    ),
  },
  responses: {
    201: jsonContent(booksSchema, "Book created"),
    400: jsonContent(errorSchema, "Bad request"),
  },
});
const updateBookRoute = createRoute({
  method: "patch",
  path: "/:id",
  request: {
    params: paramsBooksSchema,
    body: jsonContentRequired(
      booksSchema.omit({ id: true, createdAt: true, updatedAt: true }),
      "Update book"
    ),
  },
  responses: {
    200: jsonContent(booksSchema, "Book updated"),
    400: jsonContent(errorSchema, "Bad request"),
  },
});
const deleteBookRoute = createRoute({
  method: "delete",
  path: "/:id",
  request: {
    params: paramsBooksSchema,
  },
  responses: {
    200: jsonContent(booksSchema, "Book deleted"),
    400: jsonContent(errorSchema, "Bad request"),
  },
});
export { getBookRoute, createBookRoute, updateBookRoute, deleteBookRoute };
