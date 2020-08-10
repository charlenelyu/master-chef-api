# GroupProject_Ladybugs_API
This is the repository for API of the final project on CS5610.  

**Team name:** Ladybugs  
**Team member:** Tianhui Li, Yanghong Lyu  

[Heroku API](http://master-chef-api.herokuapp.com/) | [Heroku UI](http://master-chef-ui.herokuapp.com/)  

[Git repo API](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_Ladybugs_API) | [Git repo UI](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_Ladybugs_UI)  

[Iter1 on Piazza](https://piazza.com/class/k8hvaigksc71k1?cid=643) | [Iter2 on Piazza](https://piazza.com/class/k8hvaigksc71k1?cid=693)  

## Project Summary
**Project name:** Master Chef  
Our project will provide a platform for people to share their daily meals and recipes. You can post your recipes including photos and detailed steps, or create a list to mark your favorite recipes. You will receive likes and comments from other users to what you post. We also want to make a recommendation page to show today’s top recipes.  

The project is built on MERN stack, and we use **Ant Design UI** as the 3rd party libraries to help built UI.

## Iteration 1 on API
#### Progress
- Initialized database on Atlas using file `scripts/init.mongo.js`. Running this file will create three collections - recipes, users, and counters, with test data inserted to these collections.
- Established graphQL schema file and implemented the Read API and the Create API. Now the client is able to get the entire list of recipes and users, as well as add new recipes and new users.
- Integrated graphQL with MongoDB. Removed hard-coded test data and started to read from and write to the database.
- Restructured backend modules by splitting `server.js` into multiple individuals files. After modularization, `server.js` only involves code that starts the express server. `db.js` handles database connections. `api_handler.js` deals with the construction of the Apollo server. All resolver functions are put in the `resolvers` directory.

### Screenshots
- Database
![iter1-1](/readme_img/iter1-1.png)
- Create recipe
![iter1-2](/readme_img/iter1-2.png)

## Iteration 2 on API
### Progress
- Completed the Create, Read, Edit and Delete API.
- Regenerated the init script for database.
- Fixed the problem of how to upload a image and store it to database.
- Modified the input types in schema: store `img` with url, store `tags`, `ingredients`, `steps` with arrays.
- Working on the login/sign up feature, user database and authorization.

#### Contribution
- **Tianhui Li**
1. Redesigned the Home page and the basis of CRUD UI.
2. Implemented the RecipeList page UI using grid system, and integrate it with API.
3. Designed the RecipeView page UI, implement the corresponding query schema and API and integrated them together.
4. Implemented the router to RecipeView page and corresponding view/edit pages.
5. Implemented the Login/Sign up and filter UI.

- **Yanghong Lyu**
1. Regenerated the initialization script with meaningful recipes and images.
2. Implemented the CRUD API on the backend.
4. Reconstructed the backend modules using environment variable.
5. Reconstructed the AddRecipeModal and AddRecipeForm UI and integrate them with API.
6. Solve with the problem of how to upload image to cloud, get its url and store it to database when creating recipes.

#### Screenshots
- Database
![iter2-1](/readme_img/iter2-1.png)

- Create recipe
![iter2-2](/readme_img/iter2-2.png)

- Read recipe list
![iter2-3](/readme_img/iter2-3.png)

- Find one recipe
![iter2-4](/readme_img/iter2-4.png)

- Edit recipe
![iter2-5](/readme_img/iter2-5.png)

- Delete recipe
![iter2-6](/readme_img/iter2-6.png)

## Run on Localhost
1. Clone repositories: **GroupProject_Ladybugs_API** and **GroupProject_Ladybugs_UI**
1. `npm install` to install all the dependencies
2. GroupProject_Ladybugs_API: run `npm start`
3. GroupProject_Ladybugs_UI: run `npm start` and `npm run watch`
4. Open the webpage on `localhost:8000`