const express = require("express");
const router = express.Router();
const user = require("./api/user/getUser.js");
const registerUser = require("./api/user/registerUser.js");
// 物品
const getGoods = require("./api/goods/getGoods.js");
const getGoodsDetail = require("./api/goods/getGoodsDetail.js");
const publishGoods = require("./api/goods/publishGoods.js");

// 留言
const getComment = require("./api/comment/getComment.js");
const insertComment = require("./api/comment/insertComment.js");

// 登录
const login = require("./api/login.js");

// 文件上传
const upload = require("./api/upload/upload.js")

// 个人中心
const getPersonal = require("./api/personal/getPersonal.js");
const collect = require("./api/personal/collect.js");
const getMyGoods = require("./api/personal/getMyGoods.js");
const updateUserInfo = require("./api/user/updateUserInfo.js");
const addAddress = require("./api/user/addAddress.js");
const getAddress = require("./api/user/getAddress.js");
const getMyMessage = require("./api/personal/getMyMessage.js");
const getCollect = require("./api/personal/getCollect.js");

// 订单
const getOrderInfo = require("./api/order/getOrderInfo.js");
const createOrder = require("./api/order/createOrder.js");
const payOrder = require("./api/order/payOrder.js");

// 后台系统
const getAllGoods = require("./api/admin/getAllGoods.js");
const getAllOrder = require("./api/admin/getAllOrder.js");
const getAllUser = require("./api/admin/getAllUser.js");
const deleteGoods = require("./api/admin/deleteGoods.js");
const deleteOrder = require("./api/admin/deleteOrder.js");
const setUserStatus = require("./api/admin/setUserStatus.js");




router.get("*", (req, res, next) => {
    !/^\/uploads\//.test(req.url) && console.log(`GET ${req.url}`);
    next()
})
router.post("*", (req, res, next) => {
    console.log(`POST ${req.url}`);
    next()
})

router.get("/getUser", user);
router.post("/registerUser", registerUser);
router.get("/getGoods", getGoods);
router.get("/getGoodsDetail", getGoodsDetail);
router.post("/publishGoods", publishGoods);
router.get("/getCity", require("./api/getCity.js"));
router.post("/login", login);
router.get("/getComment", getComment);
router.post("/insertComment", insertComment);
router.get("/getPersonal", getPersonal);
router.post("/collect", collect);
router.get("/getOrderInfo", getOrderInfo);
router.post("/payOrder", payOrder);
router.get("/getMyGoods", getMyGoods);
router.post("/createOrder", createOrder);
router.post("/updateUserInfo", updateUserInfo);
router.post("/addAddress", addAddress);
router.get("/getAddress", getAddress);
router.get("/getMyMessage", getMyMessage);
router.get("/getCollect", getCollect);


// 后台系统接口
router.get("/admin/getAllGoods", getAllGoods);
router.post("/admin/deleteGoods", deleteGoods);
router.get("/admin/getAllUser", getAllUser);
router.get("/admin/getAllOrder", getAllOrder);
router.post("/admin/deleteOrder", deleteOrder);
router.post("/admin/setUserStatus", setUserStatus);

router.post("/upload", upload.single("file"), (req, res) => {
    // console.log(req.file);
    // console.log('<<<<<<<<<<<<<<<');
    // console.log(res.file);
    // console.log(res);
    res.json({
        code: 200,
        file: `/uploads/${req.file.filename}`
    })
})

module.exports = router;