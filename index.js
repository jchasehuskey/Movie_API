const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "Chase",
    favoriteMovies: ["Deliverance"],
  },
  {
    id: 2,
    name: "Peter",
    favoriteMovies: ["Starsky and Hutch"],
  },
];

let movies = [
  {
    "title": "Hereditary",
    "description":
      "When the matriarch of the Graham family passes away, her daughter and grandchildren begin to unravel cryptic and increasingly terrifying secrets about their ancestry, trying to outrun the sinister fate they have inherited.",
    "genre": {
      "Name": "Horror",
      "description": "a rather disturbing and dark movie",
    },
    "director": {
      "Name": "Ari Aster",
      "Bio":
        "American director Ari Aster perfected his craft in short films before finally breaking through with his feature debut. A New York native, he studied fimmaking at the AFI Conservatory in Los Angeles.  He garnered acclaim with his first feature-length film Hereditary (2018). Starring Toni Collette and Gabriel Byrne, from a script by Aster, the horror tale centered around a family with a history of mental illness and disturbing deaths. It earned critical praise and was a surprise hit with audiences. He followed with the psychological thriller Midsommar (2019), starring Florence Pugh and Will Poulter.",
      "Birthyear": "1986",
    },
    "imageURL":
      "https://mmc.tirto.id/image/otf/1024x535/2018/06/29/cover-film-hereditary-ist_ratio-16x9.jpg",
    "featured": false,
  },
  {
    "title": "Apocalypto",
    "description":
      "Jaguar Paw (Rudy Youngblood), a peaceful hunter in a remote tribe, is captured along with his entire village in a raid. He is scheduled for a ritual sacrifice until he makes a daring escape and tries to make it back to his pregnant wife and son.",

    "genre": {
      "Name": "Thriller",
      "description": "a rather hectic film",
    },
    "director": {
      "Name": "Mel Gibson",
      "Bio":
        "Mel Gibson is an American actor, director, and producer, who made his acting debut on the Australian television drama series The Sullivans (1976-1983).[1] While a student at the National Institute of Dramatic Art in Sydney, he was given an uncredited role in I Never Promised You a Rose Garden and subsequently appeared as a leading actor in the micro budget surf drama Summer City (both in 1977).[2][3] Gibson rose to prominence during the Australian New Wave cinema movement in the early 1980s, having appeared in his breakthrough role in George Miller's dystopian action film Mad Max (1979), portraying the eponymous hero. He reprised the role in its sequels, Mad Max 2 (1981) and Mad Max Beyond Thunderdome (1985).[2][4] He appeared in Peter Weir's war drama Gallipoli (1981) and the romantic drama The Year of Living Dangerously (1982).[4] Five years later he played Martin Riggs in the buddy cop action comedy Lethal Weapon alongside Danny Glover—a role he later reprised in its sequels Lethal Weapon 2 (1989), Lethal Weapon 3 (1992), and Lethal Weapon 4 (1998).",
      "Birthyear": "1956",
    },

    "imgageURL":
      "https://m.media-amazon.com/images/M/MV5BMzhmNGMzMDMtZDM0Yi00MmVmLWExYjAtZDhjZjcxZDM0MzJhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
    "featured": false,
  },
  {
    "title": "The Dark Knight",
    "description":
      "With the help of allies Lt. Jim Gordon (Gary Oldman) and DA Harvey Dent (Aaron Eckhart), Batman (Christian Bale) has been able to keep a tight lid on crime in Gotham City. But when a vile young criminal calling himself the Joker (Heath Ledger) suddenly throws the town into chaos, the caped Crusader begins to tread a fine line between heroism and vigilantism.",

    "genre": {
      "Name": "Action",
      "description": "a rather energetic film",
    },
    "director": {
      "Name": "Christopher Nolan",
      "Bio":
        "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made. One of the best-reviewed and highest-grossing movies of 2012, The Dark Knight Rises (2012) concluded Nolan's Batman trilogy. Due to his success rebooting the Batman character, Warner Bros. enlisted Nolan to produce their revamped Superman movie Man of Steel (2013), which opened in the summer of 2013. In 2014, Nolan directed, wrote, and produced the science-fiction epic Interstellar (2014), starring Matthew McConaughey, Anne Hathaway and Jessica Chastain. Paramount Pictures and Warner Bros. released the film on November 5, 2014, to positive reviews and strong box-office results, grossing over $670 million dollars worldwide.",
      "Birthyear": "1970",
    },

    "imageURL":
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    "featured": false,
  },
];

//CREATE adds a user
app.post("/users", (req, res) => {
  const newUser = req.body;
  //req.body enables us to read data from body object in request from teh bodyParser.json(); middleware function

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser); //201 means created
  } else {
    res.status(400).send("users need names");
  }
});

//UPDATE allows users to update information

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id); //checks to make sure user exists

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});

//CREATE  allows users to add a movie to list of favorites
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//DELETE ALLOWS USERS TO REMOVE MOVIE FROM FAVORITES
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//DELETE ALLOWS USERS TO REMOVE email
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);

    res.status(200).send(` user ${id} has been deleted`);
  } else {
    res.status(400).send("no such user");
  }
});

//READ   returns all movies and data
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

//READ  returns movie by title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("movie not found");
  }
});

//READ   returs movie about genre by name
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.genre.Name === genreName).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such genre");
  }
});

//READ  returns data about director by name
app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.director.Name === directorName
  ).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("director not in file");
  }
});

//listen for requests
app.listen(8080, () => {
  console.log("your app is listening on port 8080.");
});
