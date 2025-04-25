import { relations, sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 as uuidv7 } from "uuid";
export const users = sqliteTable("users_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  userName: text("user_name").notNull().unique(),
  password: text("password").notNull(),
});
export const categories = sqliteTable("categories_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: text("name").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
export const bookSources = sqliteTable("book_sources_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: text("name").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
export const books = sqliteTable("books_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  title: text("title").notNull(),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  bookSourceId: text("book_source_id")
    .notNull()
    .references(() => bookSources.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
// relations
export const categoryRelations = relations(categories, ({ many }) => ({
  books: many(books),
}));
export const bookSourceRelations = relations(bookSources, ({ many }) => ({
  books: many(books),
}));
export const bookRelations = relations(books, ({ one }) => ({
  category: one(categories, {
    fields: [books.categoryId],
    references: [categories.id],
  }),
  bookSource: one(bookSources, {
    fields: [books.bookSourceId],
    references: [bookSources.id],
  }),
}));
