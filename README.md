# GroupProject_Ladybugs_API

## Members

- Tianhui Lyu
- Yanghong Lyu

## Repositories

API: <https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_Ladybugs_API>

UI: <https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_Ladybugs_UI>

## Iteration 1

- Initialized database on Atlas using file `scripts/init.mongo.js`. Running this file will create three collections - recipes, users, and counters, with test data inserted to these collections.
- Established graphQL schema file and implemented the Read API and the Create API. Now the client is able to get the entire list of recipes and users, as well as add new recipes and new users.
- Integrated graphQL with MongoDB. Removed hard-coded test data and started to read from and write to the database.
- Restructured backend modules by spliting `server.js` into multiple individule files. After modularization, `server.js` only involes code that starts the express server. `db.js` handles database connections. `api_handler.js` deals with the construction of the Apollo server. All resolver functions are put in the `resolvers` directory.

## Screenshots for Iteration 1

![iter1-1](/readme_img/iter1-1.png)

![iter1-1](/readme_img/iter1-2.png)
