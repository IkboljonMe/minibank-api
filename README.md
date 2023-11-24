
# Minibalog API

Minibalog API is a small TypeScript-backed server API built with Node.js, TypeScript, Express, TypeORM, and Swagger. This API is designed to be minimalistic, featuring only 4-5 endpoints that you can explore and test using the Swagger documentation provided.
## Packages Used

The Minibalog API project utilizes the following packages:

- [**Node.js:**](https://nodejs.org/) JavaScript runtime for server-side development.
- [**TypeScript:**](https://www.typescriptlang.org/) Provides strong typing for enhanced developer experience.
- [**Express:**](https://expressjs.com/) Web framework for Node.js, used for building the server.
- [**TypeORM:**](https://typeorm.io/) Object-Relational Mapper (ORM) for TypeScript and JavaScript.
- [**PostgreSQL:**](https://www.postgresql.org/) Open-source relational database system.
- [**Swagger:**](https://swagger.io/) Generates interactive API documentation.
## Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:IkboljonMe/minibank-api.git
    cd minibalog-api
    ```


2. Create a `.env` file based on `.env.example`:

    ```bash
    cp .env.example .env
    ```

   Edit the `.env` file and provide the necessary configuration values. For PostgreSQL, add your local database credentials:

    ```env
    PG_HOST=localhost
    PG_PORT=5432
    PG_USERNAME=your_username
    PG_PASSWORD=your_password
    PG_DATABASE=your_database
    ```

3. Install dependencies and run the server:

    ```bash
    npm install
    npm start
    ```

   This will start the server. Open [http://localhost:1337/docs](http://localhost:1337/docs) to access Swagger documentation and explore the available endpoints.

## TypeORM and PostgreSQL

TypeORM is used for efficient database connectivity and management. It is an Object-Relational Mapper (ORM) that enables seamless interaction with databases using TypeScript. In the context of Minibalog API, PostgreSQL is utilized as the database. Ensure that you have a local PostgreSQL database set up and the credentials added to the `.env` file.

## Swagger Documentation

Explore and interact with the API using Swagger documentation. Visit [http://localhost:1337/docs](http://localhost:1337/docs) to view detailed information about available routes, request payloads, and responses. Swagger provides a user-friendly interface for testing and understanding the functionality of each endpoint.

## Project Structure

The project is kept minimal with 4-5 endpoints, demonstrating the use of one-to-many and many-to-many relations with TypeORM.

## Contribution

Contributions to the project are welcome! Feel free to optimize the code, add more endpoints, and introduce validation for enhanced functionality and security.

## TODO

 - [ ] Optimize code
 - [ ] Add more endpoints
 - [ ] Implement input validation

Feel free to contribute and make Minibalog API even better!
