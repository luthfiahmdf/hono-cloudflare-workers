# 🚀 Hono React + Cloudflare Workers + Drizzle ORM Template

This project is a starter template built with **[Hono](https://hono.dev/)** — a lightweight, fast web framework for Cloudflare Workers. It includes **Drizzle ORM** for managing your D1 database, **Zod + OpenAPI** for schema validation and API documentation, and **bcryptjs** for secure password hashing compatible with Cloudflare.

---

## ✨ Features

- ⚡ **Hono** — super fast and lightweight web framework.
- 📆 **Bun** — used as the blazing fast package manager and script runner.
- **Drizzle ORM** — type-safe, modern ORM for SQL databases.
- 💃 **Cloudflare D1** — SQLite-based serverless database.
- 📚 **OpenAPI Docs** — automatic docs using `@hono/zod-openapi` + `@scalar/hono-api-reference`.
- ☁️ **Cloudflare Workers** — fast, scalable serverless backend.

---

## 📁 Project Structure

```
.
├── drizzle.config.ts          # Drizzle configuration
├── drizzle/                   # D1 migration folder (if any)
├── src/
│   ├── controller/            # Route logic/handlers
│   ├── db/                    # Drizzle ORM schema
│   ├── routes/                # OpenAPI route definitions
│   ├── schemas/               # Zod schemas
│   ├── type/                  # Custom context/env bindings
│   └── index.ts               # App entry point
├── wrangler.jsonc             # Cloudflare Workers config
├── .env                       # Environment variables
└── README.md
```

---

## 🧰 Installation

Make sure you have [Bun](https://bun.sh/) installed.

```bash
bun install
```

---

## 💻 Local Development

```bash
bun run dev
```

> Starts local Cloudflare Worker using `wrangler dev --minify`.

---

## 📓 Database Commands

### 🔧 Generate Schema & Apply to Local D1

```bash
bun run db:dev
```

> Generates schema from `schema.ts` and applies it to your local D1 database.

### 🚀 Push Migrations to Production

```bash
bun run db:push
```

### 💣 Reset Local DB

```bash
bun run db:reset
```

---

## ☁️ Deploy to Cloudflare

```bash
bun run deploy
```

> Uses `wrangler deploy` with `--minify`.

---

## 📖 API Documentation

Swagger-style API docs are automatically generated and available at:

```
/ui → Swagger UI powered by Scalar
```

---

## ⚙️ Environment Configuration

Create a `.env` file to store your D1 credentials:

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id
CLOUDFLARE_D1_TOKEN=your_d1_token
```
