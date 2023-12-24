const express = require("express");
const router = express.Router();
const queryUser = require("./API/queryUser.js");
const userStat = require("./API/userStat.js");
const login = require("./API/login.js");

router.get("*",(req,res,next)=>{
    console.log(`GET ${req.url}`);
    next()
})
router.post("*",(req,res,next)=>{
    console.log(`POST ${req.url}`);
    next()
})

// router.get("/queryUser",queryUser.get);
router.post("/queryUser",queryUser.post);
router.post("/userStat",userStat.post);
router.post("/login",login.post);

module.exports = router;