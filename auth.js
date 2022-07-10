const jwtSecret = "your_jwt_secret"; //has to be same as key used in JWTStrategy

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport.js"); //local passport file

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //username that encodes in JWT
    expiresIn: "7d", //specifices expiration of token
    algorithm: "HS256", //algorithm used to sign or encode jwt value
  });
};

//POST login.

module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message:
            "unable to authenticate user, error message from post login in auth.js",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
