const jwt = require("jsonwebtoken");

const myObject = {};
require("dotenv").config({ processEnv: myObject });
const secret_key = process.env.SECRET_KEY || myObject.SECRET_KEY;

const db_posts = require("../prisma_queries/posts");

// GET /
async function get(req, res) {
  const allPosts = await db_posts.getAllPosts();

  res.status(200).json({
    title: "BLOG | HOMEPAGE",
    message: "Welcome to the API ",
    allPosts,
  });
}

// Following routes require authentication
async function getMyWork(req, res) {
  jwt.verify(req.token, secret_key, (err, authData) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      return res.status(200).json({
        title: "BLOG | MY WORKSPACE",
        user: req.user,
        authData,
      });
    }
  });
}

module.exports = {
  get,
  getMyWork,
};
