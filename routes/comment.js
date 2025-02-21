const { Router } = require("express");
const router = Router();
const { isAuth, verifyToken } = require("./middlewares");
const commentController = require("../controllers/comments");

router.get("/:userid",commentController.getByUser);

router.get("/:userid/:postid");

router.get("/:userid/:postid/new",isAuth, verifyToken);
router.post("/:userid/:postid/new",isAuth, verifyToken);

router.get("/:userid/:postid/:commentid");

router.put("/:userid/:postid/:commentid",isAuth, verifyToken);

router.delete("/:userid/:postid/:commentid",isAuth, verifyToken);

module.exports = router;
