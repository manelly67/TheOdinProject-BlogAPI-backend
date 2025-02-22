const { Router } = require("express");
const router = Router();
const { isAuth, verifyToken, useridIsNumber } = require("./middlewares");
const commentController = require("../controllers/comments");

router.get("/:postid", commentController.getByPost);

router.get("/:userid", useridIsNumber, commentController.getByUser);

router.get("/:userid/:postid", useridIsNumber, commentController.getByUserAndPost);

router.get("/:userid/:postid/new", isAuth, verifyToken);
router.post("/:userid/:postid/new", isAuth, verifyToken);

router.get("/:userid/:postid/:commentid");

router.put("/:userid/:postid/:commentid", isAuth, verifyToken);

router.delete("/:userid/:postid/:commentid", isAuth, verifyToken);

module.exports = router;
