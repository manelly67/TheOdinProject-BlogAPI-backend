const db_posts = require("../prisma_queries/posts");

// GET /
async function get(req, res) {
  // MODIFICAR para mostrar solo los post con la opcion de publicados
  const allPosts = await db_posts.getAllPosts();

  res.status(200).json({
    title: "BLOG | HOMEPAGE",
    message: "Welcome to the API ",
    allPosts,
    user: req.user,
  });
}

module.exports = {
    get,
}