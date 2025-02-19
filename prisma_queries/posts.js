const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// verificar cuando tenga post que hace? y agregar pagination
async function getAllPosts(req,res) {
    return await prisma.post.findMany({
      where:{
        published: true,
      },
      select:{
        id:true,
        createdAt:true,
        title:true,
        author:true,
        authorId:true,
      }
    });
  }

module.exports = {
    getAllPosts,
};