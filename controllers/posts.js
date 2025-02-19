const jwt = require("jsonwebtoken");
const myObject = {};
require("dotenv").config({ processEnv: myObject });
const secret_key = process.env.SECRET_KEY || myObject.SECRET_KEY;
const db_posts = require("../prisma_queries/posts");

async function get(req, res) {
    const allPosts = await db_posts.getAllPosts();
    res.status(200).json({
        allPosts,
        user: req.user,
      });
}

async function post(req, res) {
    jwt.verify(req.token, secret_key, (err, authData) => {
      if (err) {
        console.log(err);
        res.sendStatus(403);
      } else {
        res.json({
          message: "You can write a post",
          authData,
        });
      }
    });
  }

module.exports = {
  get,
  post,
};
