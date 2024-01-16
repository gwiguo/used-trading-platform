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

 Date: 17/01/2024 01:07:08
*/


// ----------------------------
// Collection structure for personal
// ----------------------------
db.getCollection("personal").drop();
db.createCollection("personal");

// ----------------------------
// Documents of personal
// ----------------------------
db.getCollection("personal").insert([ {
    _id: ObjectId("65a018e51a3c0000de007a73"),
    "user_id": "6587edff16e3d9df0b80b8dc",
    collected: [
        "659d6f4db0965f11226a2324"
    ],
    published: [
        "659d6f4db0965f11226a2324"
    ],
    removed: [
        "659d6f4db0965f11226a2324"
    ],
    sold: [
        "659d6f4db0965f11226a2324"
    ],
    Bought: [
        "659d6f4db0965f11226a2324"
    ]
} ]);
