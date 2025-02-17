const db_posts = require("../prisma_queries/posts");

// GET /
async function get(req, res) {
  console.log(req.user);
  const allPosts = await db_posts.getAllPosts();

  res.json({
    title: "BLOG | HOMEPAGE",
    message: "Welcome to the API ",
    allPosts,
    user: req.user,
  });
}

module.exports = {
    get,
}