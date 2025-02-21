const db_users = require("../prisma_queries/users");
const db_comments = require("../prisma_queries/comments");

async function getByUser(req, res) {
  let { userid } = req.params;
  userid = Number(userid);

  if (Number.isNaN(userid)) {
    // check is a value is equal NaN
    res.status(400).json({
      text: "the user id must be a number",
    });
  } else {
    const userExists = await db_users.userExists(userid);
    switch (userExists) {
      case true: {
        const commentsByUser = await db_comments.getByUser(userid);
        res.status(200).json({
          commentsByUser,
        });
        break;
      }
      case false:
        res.status(400).json({
          text: "this user does not exist",
        });
        break;
    }
  }
}

module.exports = {
  getByUser,
};
