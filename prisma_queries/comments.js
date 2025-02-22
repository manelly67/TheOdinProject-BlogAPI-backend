const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getByUser(userid) {
  return await prisma.comment.findMany({
    where: {
      userId: Number(userid),
    },
    select: {
      id: true,
      createdAt: true,
      text: true,
      user: {
        select: {
          username: true,
        },
      },
      userId: true,
      postAbout: {
        select: {
          title: true,
        },
      },
    },
  });
}

async function getByUserAndPost(userid, postid) {
  return await prisma.comment.findMany({
      where:{
        AND:{
          userId:{
            equals: Number(userid),
          },
          postAboutId:{
            equals: postid,
          },
        }
      },
      select: {
        id: true,
        createdAt: true,
        text: true,
        user: {
          select: {
            username: true,
          },
        },
        userId: true,
        postAbout: {
          select: {
            title: true,
          },
        },
      },
    });

}

async function getByPost(postid) {
  return await prisma.comment.findMany({
    where:{
      postAboutId: postid,
    },
    select:{
      id: true,
      createdAt: true,
      text: true,
      user: {
        select: {
          username: true,
        },
      },
      userId: true,
      postAbout: {
        select: {
          title: true,
        },
      },
    },
  });
}

module.exports = {
  getByUser,
  getByUserAndPost,
  getByPost,
};
