const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  y ver como agregar pagination
async function getAllPosts() {
    return await prisma.post.findMany({
      where:{
        published: true,
      },
      select:{
        id:true,
        createdAt:true,
        title:true,
        author:{
          select:{
            username:true,
          }
        },
        authorId:true,
      }
    });
  };

async function getByAuthor(authorid) {
  return await prisma.post.findMany({
    where:{
      AND:{
        published:{
          equals: true,
        },
        authorId:{
          equals: Number(authorid),
        }
      }
    },
    select:{
      id:true,
      createdAt:true,
      title:true,
      author:{
        select:{
          username:true,
        }
      },
      authorId:true,
    }
  });
}

async function createNewPost(req,res,id,authData) {
  await prisma.post.create({
    data: {
      id: id,
      title: req.body.title,
      content: req.body.content,
      authorId: authData.userId,
      published: req.body.published,
    },
  })
  .then(async () => {
    await prisma.$disconnect();
    res.json({
      text:'new post created', 
      postid: id,
    });
  })
  .catch(async (err) => {
    if(err){
      console.log(err);
    }else{
      await prisma.$disconnect();
      process.exit(1);
    }
  })
  
};

async function getPostFromId(id) {
  
}

module.exports = {
    getAllPosts,
    createNewPost,
    getPostFromId,
    getByAuthor,
};