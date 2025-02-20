const { Router } = require("express");
const { isAuth, roleAuthor, verifyToken } = require("./middlewares");
const postsController = require("../controllers/posts");

const router = Router();

router.get("/", postsController.get);

router.get("/mywork", isAuth,roleAuthor, verifyToken,postsController.getMyWork);

router.get("/new", isAuth, roleAuthor, verifyToken, postsController.getNew);
router.post("/new", isAuth, roleAuthor, verifyToken, postsController.postNew);

router.get("/:authorid", postsController.getByAuthor);

router.get("/:authorid/:postid", postsController.getPostById);

router.get("/:authorid/:postid/comments");

router.put("/:postid", isAuth, roleAuthor, verifyToken);

router.delete("/:postid", isAuth, roleAuthor, verifyToken);

module.exports = router;
