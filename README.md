# News API Project

## Introduction

This is a project of a simple news server with the psql database at the back-end.

In order to use the serwer please create and set the .env.development and .env.test files in which you will have to assign the name of the database to a Enviroment Variable.

To get familiar with the dotenv module please check the following link: https://www.npmjs.com/package/dotenv

You can interact with 2 databases: development and test.
In order to do that please set the development PGDATABASE to nc_news (PGDATABASE=nc_news) and the test PGDATABASE to nc_news_test (PGDATABASE=nc_news_test).

Please take a look at the avaliable scripts in the package.json file.
First, you will have to run setup-db script (npm setup-dbs).
Then, you can use seed script (npm run seed) in order to seed the database with some initial tables and data.

There are also tests avaliable for this server. Please note that while testing the database uses the test data instead of development data.

## Connection to the database
