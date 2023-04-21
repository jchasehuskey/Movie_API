A RESTful API for movie viewers that want to be able to access information about different movies called "myFlix". It’s the M, E and N from the MERN stack and connects to a database that is hosted on MongoDB Atlas.

This is a the server-side component of a “movies” web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

The main purpose of this app is to present how I create a REST API architecture.

This site was built using Heroku GitHub Deploys.

---

# Getting Started
## Prerequisites
Install nodejs LTS or the latest version.

Setup a mongodb database.

## Installation
Clone the repository:
 git clone https://github.com/jchasehuskey/movie_API.git
cd movie_API

Create a file and name it .env.development.local for environment variables and add the next content:

CONNECTION_URI="your mongo DB connection string"
PORT=your port number
HOST="your host name with the used http protocol together"
JWT_SECRET="your super secret code"

then run the next commands:

npm install
npm run dev

--- 

# Features
Get a list of all movies
Get (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
Get data about a genre (description) by name/title (e.g., “Comedy”)
Get data about a director (bio, birth year, death year) by name
Allow new users to register
Allow users to update their user info (username)
Allow users to add a movie to their list of favorites (showing only a text that a movie has been added)
Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed)
Allow existing users to deregister (showing only a text that a user email has been removed)

---

## Dependencies
{
  "name": "movie_api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/jchasehuskey/movie_API.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/jchasehuskey/movie_API/issues"
  },
  "homepage": "https://github.com/jchasehuskey/movie_API#readme",
  "dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.20.0",
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "express-validator": "^6.14.2",
    "jsonwebtoken": "^8.5.1",
    "lodash": "^4.17.21",
    "mongoose": "^6.4.0",
    "morgan": "^1.10.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "uuid": "^8.3.2"
  },
  "devDependencies": {
    "eslint": "^8.17.0",
    "nodemon": "^2.0.16"
  }
}

