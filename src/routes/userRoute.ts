import { createRoute } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { usersSchema } from "../schemas/user";
import { errorSchema } from "../schemas/globalSchema";

const createUserRoute = createRoute({
  method: "post",
  path: "",
  request: {
    body: jsonContentRequired(usersSchema.omit({ id: true }), "Create user"),
  },
  responses: {
    200: jsonContent(usersSchema, "User created"),
    400: jsonContent(errorSchema, "Bad request"),
  },
});

export { createUserRoute };
