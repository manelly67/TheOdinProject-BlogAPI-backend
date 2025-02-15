const db_posts = require('../prisma_queries/posts');

async function getHomePage(req, res) {
    console.log(req.user);
    const allPosts = await db_posts.getAllPosts();
    
    res.json({
        message: "Welcome to the API ",
        allPosts,
        user: req.user,
      });
  };

module.exports = {
    getHomePage,
};