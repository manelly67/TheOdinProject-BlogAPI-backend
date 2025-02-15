const { Router } = require('express');
const mainController = require('../controllers/mainController');

const router = Router();

router.get("/", mainController.newUserGet);

router.post("/", mainController.newUserPost);


module.exports = router;