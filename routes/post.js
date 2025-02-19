const { Router } = require('express');
const { isAuth, roleAuthor, verifyToken } = require("./middlewares");
const postsController = require('../controllers/posts');


const router = Router();

router.get('/', postsController.get);

router.get('/:authorid');

router.get('/:authorid/:postid');

router.get('/:authorid/:postid/comments');

router.get('/workspace',isAuth, roleAuthor, verifyToken);

router.post('/',isAuth, roleAuthor, verifyToken, postsController.post);

router.put('/:postid', isAuth, roleAuthor,verifyToken);

router.delete('/:postid',isAuth, roleAuthor,verifyToken);


module.exports = router;