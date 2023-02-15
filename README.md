# News API Projectexplore

## Introduction

Hello and Welcome, my name is Marek Januszewski, and this is a brief description of my coding project.
It is reflecting of my 13 weeks voyage to the Javascript Land, with the guidance of Northcoders, where I could explore and learn diffrent concepts, from the very fundamentals up to some more complex and therfore practical applications of js.

This project is a news service.

Link to the server: https://testncnews.onrender.com/api

## The Project Details

The server uses node express (https://expressjs.com/) for hosting. It also uses postgres (https://www.postgresql.org/) to interact with a sql database.
The list of the end-points covered and examples of how to interact with them can be found in endpoints.json file.

## Installation and Dependencies

Please feel free to fork and clone the repository. In order to use it please install npm package (https://www.npmjs.com/) with the following dependencies:

- express https://expressjs.com/
- dotenv https://www.npmjs.com/package/dotenv
- postgres https://www.postgresql.org/

devDependencies:

- husky https://www.npmjs.com/package/husky
- jest https://jestjs.io/
- jest extended https://www.npmjs.com/package/jest-extended
- jest sorted https://www.npmjs.com/package/jest-sorted
- pg-format https://www.npmjs.com/package/pg-format
- supertest https://www.npmjs.com/package/supertest

Please see the avaliable scripts in package.json file.

Installation steps:

- There should be two files created: .env.test and .env.development. Each of the files should contain PGDATABASE=<database_name_here>, please see the /db/setup.sql file for the correct names.

- Run setup-dbs script to setup (npm run setup-dbs) the databases (test and development).

- Run seed script (npm run seed) to seed the databases with data.

Use npm test to run tests for both: utils (smaller helper functions) and integration (end to end) testing.

In order to use the serwer please create and set the .env.development and .env.test files in which you will have to assign the name of the database to a Enviroment Variable (PGDATABASE=<database_name_here>)

To get familiar with the dotenv module please check the following link: https://www.npmjs.com/package/dotenv

You can interact with 2 databases: development and test.
In order to do that please set the development PGDATABASE to nc_news (PGDATABASE=nc_news) and the test PGDATABASE to nc_news_test (PGDATABASE=nc_news_test).
