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

 Date: 17/01/2024 01:06:59
*/


// ----------------------------
// Collection structure for order
// ----------------------------
db.getCollection("order").drop();
db.createCollection("order");

// ----------------------------
// Documents of order
// ----------------------------
db.getCollection("order").insert([ {
    _id: ObjectId("65a6b3743e2a7b7694182387"),
    "user_id": "6587edff16e3d9df0b80b8dc",
    "goods_id": "65a0101c0ace63f04cb3b3d3",
    "goods_title": "VGO智能高速负离子护发吹风机",
    category: "买到的",
    "create_time": "2024-01-17 00:48:52",
    "pay_time": "",
    "pay_status": "未支付",
    "pay_way": "",
    "order_status": "待付款",
    "goods_price": "4444",
    "goods_cover": "/uploads/1704988696846-qun.jpg",
    mobile: "",
    address: "",
    name: "",
    "address_detail": ""
} ]);
