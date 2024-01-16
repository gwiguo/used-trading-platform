/*
 Navicat Premium Data Transfer

 Source Server         : db
 Source Server Type    : MongoDB
 Source Server Version : 60002
 Source Host           : localhost:27017
 Source Schema         : usedTradingPlatform

 Target Server Type    : MongoDB
 Target Server Version : 60002
 File Encoding         : 65001

 Date: 17/01/2024 01:07:16
*/


// ----------------------------
// Collection structure for user
// ----------------------------
db.getCollection("user").drop();
db.createCollection("user");

// ----------------------------
// Documents of user
// ----------------------------
db.getCollection("user").insert([ {
    _id: ObjectId("6587edb716e3d9df0b80b8da"),
    account: "admin",
    password: "admin",
    role: "admin",
    nickname: "闹够了没有",
    status: true,
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp"
} ]);
db.getCollection("user").insert([ {
    _id: ObjectId("6587edff16e3d9df0b80b8dc"),
    account: "test",
    password: "test",
    role: "",
    nickname: "测试账号",
    status: true,
    avatar: "https://ooo.0x0.ooo/2023/01/16/QR57a.jpg"
} ]);
