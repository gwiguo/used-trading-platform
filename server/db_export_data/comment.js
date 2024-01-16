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

 Date: 17/01/2024 01:04:47
*/


// ----------------------------
// Collection structure for comment
// ----------------------------
db.getCollection("comment").drop();
db.createCollection("comment");

// ----------------------------
// Documents of comment
// ----------------------------
db.getCollection("comment").insert([ {
    _id: ObjectId("659ecd5bdb7ea3eb6d8b41f8"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "111111",
    avatar: "https://ooo.0x0.ooo/2023/01/16/QR57a.jpg",
    nickname: "测试账号",
    time: "2024-01-11 01:01:15"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ecd8099153db128db85ef"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "122323232",
    avatar: "https://ooo.0x0.ooo/2023/01/16/QR57a.jpg",
    nickname: "测试账号",
    time: "2024-01-11 01:01:52"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ecdcb99153db128db85f0"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "test",
    avatar: "https://ooo.0x0.ooo/2023/01/16/QR57a.jpg",
    nickname: "测试账号",
    time: "2024-01-11 01:03:07"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ed03fdf0eb7011fb68a74"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "1112222222222222222",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp",
    nickname: "闹够了没有",
    time: "2024-01-11 01:13:35"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ed0d9306e0c79fe9f59b3"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "哈哈哈",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp",
    nickname: "闹够了没有",
    time: "2024-01-11 01:16:09"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ed0ec306e0c79fe9f59b4"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "嗯嗯嗯嗯！",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp",
    nickname: "闹够了没有",
    time: "2024-01-11 01:16:28"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ed150306e0c79fe9f59b5"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "testtest",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp",
    nickname: "闹够了没有",
    time: "2024-01-11 01:18:08"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ed17e306e0c79fe9f59b6"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "2222",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp",
    nickname: "闹够了没有",
    time: "2024-01-11 01:18:54"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ed182306e0c79fe9f59b7"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "32323",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp",
    nickname: "闹够了没有",
    time: "2024-01-11 01:18:58"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ed186306e0c79fe9f59b8"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "111111111111111",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp",
    nickname: "闹够了没有",
    time: "2024-01-11 01:19:02"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ed18d306e0c79fe9f59b9"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "222222222222222",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp",
    nickname: "闹够了没有",
    time: "2024-01-11 01:19:09"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ed18f306e0c79fe9f59ba"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "3333333333333",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp",
    nickname: "闹够了没有",
    time: "2024-01-11 01:19:11"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ed193306e0c79fe9f59bb"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "4444444444444",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp",
    nickname: "闹够了没有",
    time: "2024-01-11 01:19:15"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ed2ee306e0c79fe9f59bc"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "hhh",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp",
    nickname: "闹够了没有",
    time: "2024-01-11 01:25:02"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("659ed4fd306e0c79fe9f59bd"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp",
    nickname: "闹够了没有",
    time: "2024-01-11 01:33:49"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("65a00a1728dd778a0d696c9c"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "????????",
    avatar: "https://ooo.0x0.ooo/2023/01/16/QR57a.jpg",
    nickname: "测试账号",
    time: "2024-01-11 23:32:39"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("65a2b88f73a94d315b80f871"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "噢噢噢噢",
    avatar: "https://ooo.0x0.ooo/2023/01/16/QR57a.jpg",
    nickname: "测试账号",
    time: "2024-01-14 00:21:35"
} ]);
db.getCollection("comment").insert([ {
    _id: ObjectId("65a2b89873a94d315b80f872"),
    "goods_id": "659d6f4db0965f11226a2324",
    content: "事实上事实上",
    avatar: "https://ooo.0x0.ooo/2023/01/16/QR57a.jpg",
    nickname: "测试账号",
    time: "2024-01-14 00:21:44"
} ]);
