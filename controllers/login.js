const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db_users = require('../prisma_queries/users');

async function get(req, res) {
    switch (req.isAuthenticated()) {
        case false:
            res.json({
                title: "BLOG | LOGIN",
                user: req.user,
                errors: req.session.messages,
              });
          break;
        case true:
            res.status(302).json({
                title: "Logout Required",
                user: req.user,
                text: "You are already Login - Logout here is you want:",
            });
          break;
      }
};

// the following routes require password.js
const post = [
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureMessage: true,
      })
];



// Las tres funciones requeridas para el funcionamiento de passport.js

passport.use(
    new LocalStrategy(async (username, password, done) => {
      //passport need this names (username and password) in the login form
  
      try {
        const user = await db_users.getUserFromUsername(username);
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
        // A successful login will grant the user a JWT
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db_users.getUserFromId(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });



module.exports = {
    get,
    post,
  };