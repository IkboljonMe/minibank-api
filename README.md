# Minibank API

This is a small bank REST API that I made with Express, TypeScript, TypeORM and PostgreSQL.
I built it to learn TypeORM relations (one-to-many and many-to-many) and how to document an API with Swagger.

## Features

- Create and delete bank clients
- Create bankers and connect a banker to a client (many-to-many)
- Deposit and withdraw money for a client (one-to-many transactions)
- A withdraw can't make the balance go below 0
- Amounts are checked: they must be positive numbers with max 2 decimal places
- Every deposit/withdraw runs in a database transaction and locks the client row, so two requests at the same time can't break the balance
- Swagger docs for all routes
- A Postman collection is in `Minibank-api.postman_collection.json`

## Built with

- Node.js and TypeScript
- Express
- TypeORM
- PostgreSQL
- Swagger (swagger-jsdoc and swagger-ui-express)
- pino for logging

## How to run

You need Node.js (18 or newer) and Docker (or your own PostgreSQL).

1. Clone the repo and install packages:

   ```bash
   git clone https://github.com/IkboljonMe/minibank-api.git
   cd minibank-api
   npm install
   ```

2. Start PostgreSQL with Docker:

   ```bash
   docker run -d --name minibank-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:15
   ```

3. Create the `.env` file:

   ```bash
   cp .env.example .env
   ```

   The values in `.env.example` already work with the Docker command above.

4. Start the server:

   ```bash
   npm start
   ```

   The tables are created automatically on the first start (TypeORM `synchronize`).
   The server runs on http://localhost:1337.

To check the TypeScript types you can run `npm run typecheck`.

## Environment variables

| Name          | Example     | What it is                         |
| ------------- | ----------- | ---------------------------------- |
| `SERVER_PORT` | `1337`      | Port for the Express server        |
| `PG_HOST`     | `localhost` | PostgreSQL host                    |
| `PG_PORT`     | `5432`      | PostgreSQL port                    |
| `PG_USERNAME` | `postgres`  | PostgreSQL user                    |
| `PG_PASSWORD` | `postgres`  | PostgreSQL password                |
| `PG_DATABASE` | `postgres`  | Database name                      |
| `NODE_ENV`    | (empty)     | If it is `production`, TypeORM will not change the tables automatically |

## API routes

| Method | Route                                     | What it does                                   |
| ------ | ----------------------------------------- | ---------------------------------------------- |
| POST   | `/api/client`                             | Create a client (`firstName`, `lastName`, `email`, `cardNumber`, optional `balance`) |
| DELETE | `/api/client/:clientId`                   | Delete a client and their transactions         |
| POST   | `/api/client/:clientId/transaction`       | Deposit or withdraw (`type`: `deposit` or `withdraw`, `amount`) |
| POST   | `/api/banker`                             | Create a banker (`firstName`, `lastName`, `email`, `cardNumber`, `employeeNumber`) |
| PUT    | `/api/banker/:bankerId/client/:clientId`  | Connect a banker to a client                   |

Example deposit:

```bash
curl -X POST http://localhost:1337/api/client/1/transaction \
  -H "Content-Type: application/json" \
  -d '{"type": "deposit", "amount": 50}'
```

Errors come back as JSON like `{"error": "Insufficient funds"}` with status 400, 404 or 409.

## Swagger docs

When the server is running, open http://localhost:1337/docs.
The raw OpenAPI JSON is at http://localhost:1337/docs.json.

## Project structure

```
src/
  app.ts            starts the server
  controllers/      route handlers (client, banker, transaction)
  entities/         TypeORM entities (Client, Banker, Transaction)
  middlewares/      request body check
  routes/           Express routes with Swagger comments
  utils/            database connection, logger, swagger setup
```

---

Made by [IkboljonMe](https://github.com/IkboljonMe)
