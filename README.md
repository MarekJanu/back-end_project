# News API Projectexplore

## _Introduction_

Hello and Welcome, my name is Marek Januszewski, and this is a brief description of my coding project.
It is reflecting of my 13 weeks voyage to the Javascript Land, with the guidance of Northcoders, where I could explore and learn diffrent concepts, from the very fundamentals up to some more complex and therfore practical applications of js.

This project is a news service.

Link to the server: https://testncnews.onrender.com/api
Link to my front-end project connected to this serwer: https://github.com/MarekJanu/front-end_project
Linkt to live website that is combining both projects: https://main--marekfeproapp.netlify.app/

## _The Project Details_

The server uses node express (https://expressjs.com/) for hosting. It also uses postgres (https://www.postgresql.org/) to interact with a sql database.
The list of the end-points covered and examples of how to interact with them can be found in endpoints.json file.

## _Installation_

Installation steps:

- Fork and clone this repo to a new local folder on your computer:

```
$ git clone https://github.com/MarekJanu/back-end_project
```

- create two .env files (one for development and one for tes database), each file should contain PGDATABASE=<database_name_here>. You can name them for example PGDATABASE==nc_news and PGDATABASE==nc_news_test

- install all the dependencies by simply:

```
$ npm install
```

- Set-up the databases and seed it with data by executing the following scripts:

```
$ npm run setup-dbs
```

```
$ npm run seed
```

## _Testing_

You can use the _jest_ framework to run all the test prepared for this app:

```
$ npm test
```

## _Application Dependencies_

| Dependency | Version         | Description                   | Docs                                                              |
| ---------- | --------------- | ----------------------------- | ----------------------------------------------------------------- |
| npm        | 17.8.0 or later | Node.js / npm                 | https://docs.npmjs.com/downloading-and-installing-node-js-and-npm |
| express    | 4.18.2 or later | Web framework for Node.js     | https://www.npmjs.com/package/express                             |
| pg         | 8.7.3 or later  | PostgreSQL client for Node.js | https://www.npmjs.com/package/pg                                  |
| cors       | 2.8.5 or later  | Cross-Origin Resource Sharing | https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS            |
| dotenv     | 16.0.0 or later | Manages enviroment variables  | https://www.npmjs.com/package/dotenv                              |
| supertest  | 6.3.3 or later  | Tests                         | https://www.npmjs.com/package/supertest                           |

## _Developer Dependencies_

| Dependency  | Version         | Description                                        | Docs                                           |
| ----------- | --------------- | -------------------------------------------------- | ---------------------------------------------- |
| jest        | 27.5.1 or later | JavaScript testing framework                       | https://jestjs.io/docs/getting-started         |
| jest-sorted | 1.0.14 or later | Test sort and order of arrays & objects            | https://github.com/P-Copley/jest-sorted#readme |
| pg-format   | 1.0.4 or later  | Formats PSQL queries to protect form SQL injection | https://www.npmjs.com/package/pg-format        |
| husky       | 8.0.2 or later  | Runs the test files before committing              | https://www.npmjs.com/package/husky            |
