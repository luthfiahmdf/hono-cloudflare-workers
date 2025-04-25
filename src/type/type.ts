import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "../db/schema";

type DrizzleDB = DrizzleD1Database<typeof schema>;

export type Context = {
  Binding: {
    DB: DrizzleDB;
  };
  Variables: {
    db: DrizzleDB;
  };
};
