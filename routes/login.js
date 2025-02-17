const { Router } = require('express');
const router = Router();
const loginController = require('../controllers/login');


router.get('/', loginController.get);

// the following route require password.js
router.post('/', loginController.post);



module.exports = router;