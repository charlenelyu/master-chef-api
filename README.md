# Master Chef API

This is the repository for the API of Master Chef.

[Click here for demo!](https://master-chef-ui.herokuapp.com/)

Please refer to the [UI Repo](https://github.com/charlenelyu/master-chef-ui) for more info.

## Project Summary

Our project provides a platform for home cooks to share their recipes and food ideas. The whole application is based on MERN stack and GraphQL. We also used Ant Design to help us build the UI. The boilerplate code of this project is from the book *Pro MERN Stack* by Vasan Subramanian.

**Contributors:** Yanghong Lyu, Tianhui Li

**Features:**

- View posted recipes
- Search for recipes by title
- Filter recipes by tags
- After Login or Sign Up:
  - Create your own recipes
  - Edit recipes you created
  - Delete recipes you created
  - Upload your profile

## Run on Your Computer

1. Clone repositories: **master-chef-ui** and **master-chef-api**.
2. Run `npm install` in both directories to install all the dependencies.
3. Creat `.env` in both directories, set up all environment variables following `sample.env`.
4. In **master-chef-api**, run `npm start` to start the server.
5. In **master-chef-ui**: first run `npm run compile` to compile all JS files, then run `npm start` to start the server.
6. You can now test it on local host!
