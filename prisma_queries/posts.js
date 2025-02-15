const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function getAllPosts(req,res) {
    return await prisma.post.findMany();
  }

module.exports = {
    getAllPosts,
};