const { Router } = require('express');
const router = Router();

const jwt = require("jsonwebtoken");
const { verifyToken } = require("./middlewares");


router.get('/', verifyToken , (req, res) => {

    jwt.verify(req.token,'secret',(err,authData)=>{
        if(err){
            console.log(err);
            res.sendStatus(403);
        }else{
            res.json({
                message: "You can write a comment",
                authData
            });
        }
    });
    
});


module.exports = router;