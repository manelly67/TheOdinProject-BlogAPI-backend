const { Router } = require("express");
const { isAuth, roleAuthor, verifyToken } = require("./middlewares");
const postsController = require("../controllers/posts");

const router = Router();

router.get("/", postsController.get);

router.get("/:authorid", postsController.getByAuthor);

router.get("/:authorid/:postid", postsController.getPostById);

router.get("/:authorid/:postid/comments");

// Following routes require authentication
router.get("/workspace", isAuth, roleAuthor, verifyToken);

router.get("/new", isAuth, roleAuthor, verifyToken, postsController.getNew);
router.post("/new", isAuth, roleAuthor, verifyToken, postsController.postNew);

router.put("/:postid", isAuth, roleAuthor, verifyToken);

router.delete("/:postid", isAuth, roleAuthor, verifyToken);

module.exports = router;
