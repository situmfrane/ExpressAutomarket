# ExpressAutomarket
Automarket web app created using Express.js, Sequelize ORM, Tailwind CSS and EJS templating engine

## Overview
This project was meant to be a web crawler that pulls together automarket listings from various sites, but due to not having access to said sites' API's that was not possible. That being said, I decided to create an automarket web app just to practice. This is a backend focused project, hence why the UI isn't fully responsive and could use some more work. 

## Get started
This project requires:
* Node.js
* MySQL
  
Install node dependencies using ```npm install```  
  
You also need to create a .env file with the following properties: 
* HOST: the database host  
* USER: the database user  
* DATABASE: the database name  
* DB_PASS: the database password  
* SECRET_TOKEN: token for JWT creation, preferably a long randomly generated string  
  
Or just hardcode this info into ```config/database.js``` and ```authenticateJWT.js```  
  
Run the app using nodemon by running ```nodemon server.js``` or by typing the command ```npm run startApp```  

## Project hierarchy
### Root 
* Project initialization files, server.js to get the server up and running
* ```authenticateJWT.js``` verifies the user and stores JWT into localstorage to be passed around while the app is being used  
### Config folder
* Contains ```database.js``` which is used for the database connection as well as ```cars.json``` which is going to be used later
### Models folder
* Contains Sequelize models for database tables
### Routes folder
* ```Register.js & Login.js``` - routing for user sign up and login  
* ```Post.js``` - crud routes  
* ```CarPage.js``` - routes for getting a single car
* ```Search.js``` - routes for getting all cars and getting filtered cars
* ```MyAccount.js``` - Allows user to edit and delete thier posts
### Views folder
Contains ejs views for routes mentioned above



