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

 Date: 25/12/2023 00:33:24
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
    status: true
} ]);
db.getCollection("user").insert([ {
    _id: ObjectId("6587edff16e3d9df0b80b8dc"),
    account: "test",
    password: "test",
    role: "",
    nickname: "测试账号",
    status: true
} ]);
