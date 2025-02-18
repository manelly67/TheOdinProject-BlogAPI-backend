module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports.clearMessages = (req, res, next) => {
  req.session.messages = null;
  next();
};

// FORMAT OF TOKEN
// Authorization: bearer <access_token>
module.exports.verifyToken = (req, res, next) => {
  // get auth header value
  const bearerHeader = req.headers["authorization"];
  console.log(req.headers);
  if (typeof bearerHeader !== "undefined") {
    // split at the space
    const bearer = bearerHeader.split(" ");
    // get token from array
    const bearerToken = bearer[1];
    // set the token
    req.token = bearerToken;
    // next middleware
    next();
  } else {
    // forbidden
    res.sendStatus(403);
  }
};
