import { createRoute } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { usersSchema } from "../schemas/user";

const createUserRoute = createRoute({
  method: "post",
  path: "",
  request: {
    body: jsonContentRequired(usersSchema.omit({ id: true }), "Create user"),
  },
  responses: {
    200: jsonContent(usersSchema, "User created"),
  },
});

export { createUserRoute };
