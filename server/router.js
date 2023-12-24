const express = require("express");
const router = express.Router();
const user = require("./api/getUser.js");
// const userStat = require("./api/userStat.js");
// const login = require("./api/login.js");

router.get("*", (req, res, next) => {
    console.log(`GET ${req.url}`);
    next()
})
router.post("*", (req, res, next) => {
    console.log(`POST ${req.url}`);
    next()
})

router.post("/getUser", user.post);
// router.post("/userStat", userStat.post);
// router.post("/login", login.post);

module.exports = router;