const db_users = require("../prisma_queries/users");
const db_posts = require("../prisma_queries/posts");
const db_comments = require("../prisma_queries/comments");

async function getByUser(req, res) {
  const { userid } = req.params;
  const userExists = await db_users.userExists(userid);
  switch (userExists) {
    case false:
      res.status(400).json({
        text: "this user does not exist",
      });
      break;
    case true:
      {
        const comments = await db_comments.getByUser(userid);
        res.status(200).json({
          commentsByUser: comments,
          userid: userid,
        });
      }
      break;
  }
}

async function getByUserAndPost(req, res) {
  const { userid, postid } = req.params;
  const userExists = await db_users.userExists(userid);
  const postExists = await db_posts.postExists(postid);
  switch (userExists) {
    case false:
      res.status(400).json({
        text: "this user does not exist",
      });
      break;
    case true:
      switch (postExists) {
        case false:
          res.status(400).json({
            text: "this post does not exist",
          });
          break;
        case true:
          {
            const comments = await db_comments.getByUserAndPost(userid, postid);
            res.status(200).json({
              commentsByUserAndPost: comments,
              userid: userid,
              postid: postid,
            });
          }
          break;
      }
  }
}

module.exports = {
  getByUser,
  getByUserAndPost,
};
