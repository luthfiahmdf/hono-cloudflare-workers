import { createRoute } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { usersSchema } from "../schemas/user";

const createUser = createRoute({
  method: "post",
  path: "/user",
  request: {
    body: jsonContentRequired(usersSchema.omit({ id: true }), "Create user"),
  },
  responses: {
    "200": jsonContent(usersSchema, "User created"),
  },
});
export { createUser };
