# News API Project

## Introduction

This is a project of a simple news server with the psql database at the back-end. It is reflectiong the past 7 weeks of learing and exploaring js during the Northcoders software development bootcam.

Link to the server: https://testncnews.onrender.com/api

## The Project Details

The server uses node express (https://expressjs.com/) for hosting. It also uses postgres (https://www.postgresql.org/) to interacl with sql database.
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

- Run setup-dbs script to setup the databases (test and development).

- Run seed script to seed the databases with data.

Use npm test to sun tests for both: utils and

In order to use the serwer please create and set the .env.development and .env.test files in which you will have to assign the name of the database to a Enviroment Variable.

To get familiar with the dotenv module please check the following link: https://www.npmjs.com/package/dotenv

You can interact with 2 databases: development and test.
In order to do that please set the development PGDATABASE to nc_news (PGDATABASE=nc_news) and the test PGDATABASE to nc_news_test (PGDATABASE=nc_news_test).

Please take a look at the avaliable scripts in the package.json file.
First, you will have to run setup-db script (npm setup-dbs).
Then, you can use seed script (npm run seed) in order to seed the database with some initial tables and data.

There are also tests avaliable for this server. Please note that while testing the database uses the test data instead of development data.
