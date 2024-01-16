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

 Date: 17/01/2024 01:06:49
*/


// ----------------------------
// Collection structure for goods
// ----------------------------
db.getCollection("goods").drop();
db.createCollection("goods");

// ----------------------------
// Documents of goods
// ----------------------------
db.getCollection("goods").insert([ {
    _id: "65928b0f583200004b007ca2",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://imgservice2.suning.cn/uimg1/b2c/image/tMkz43sZj_QT5q8J08XzpQ.jpg_200w_200h_4e_80Q"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "95新 万国葡萄牙系列精钢自动机械计时男表IW371445 40.9mm",
    type: "全部",
    "user_avatar": "https://p9-passport.byteacctimg.com/img/user-avatar/f21b9fb46eaeffecc3c6727252e5978f~100x100.awebp",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "65928f8642170000ca0029a2",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/534e7480959be204c2ba1dd5281be60f.png?type=webp&quality=95&thumbnail=265x265&imageView"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "Pro星选红运内裤 男式莫代尔内裤",
    type: "全部",
    "user_avatar": "https://ooo.0x0.ooo/2023/01/16/QRBHS.jpg",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "65928f8642170000ca0029a3",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/5ba275eb322cd5cdbf7788d4adfd76fb.jpg?type=webp&quality=95&thumbnail=265x265&imageView"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "HT 漫威蜘蛛侠 COSBABY珍藏人偶",
    type: "全部",
    "user_avatar": "https://i.imgtg.com/2023/01/16/QR57a.jpg",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "65928f8642170000ca0029a4",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/ccef6c45ca94a9cbc42cfd4d1340a8be.png?type=webp&quality=95&thumbnail=265x265&imageView"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "100%棉时尚休闲打底男式长袖纯棉T恤",
    type: "全部",
    "user_avatar": "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "65928f8642170000ca0029a5",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/e67c54e4ed05efd8d0e8bbb0623bb914.png?type=webp&quality=95&thumbnail=265x265&imageView"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "Pro星选 澳洲羊毛保暖有型男士雪地靴",
    type: "全部",
    "user_avatar": "https://avatars.githubusercontent.com/u/23100055?v=4&size=64",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "65928f8642170000ca0029a6",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/b95315223cd55a3a032f91f05071aa6e.png?type=webp&quality=95&thumbnail=265x265&imageView"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "尽享舒适 温暖加倍升级款羊羔绒卫裤",
    type: "全部",
    "user_avatar": "https://avatars.githubusercontent.com/u/23100055?v=4&size=64",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "65928f8642170000ca0029a7",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/b74926900c27a915540d926e523858e8.png?type=webp&quality=95&thumbnail=265x265&imageView"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "贴合脊柱深度按摩，减压按摩坐垫",
    type: "全部",
    "user_avatar": "https://avatars.githubusercontent.com/u/23100055?v=4&size=64",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "65928f8642170000ca0029a8",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/34c06627db2be472b1b1d469ef02603a.png?type=webp&quality=95&thumbnail=265x265&imageView"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "任天堂Switch 续航增强版 国行",
    type: "全部",
    "user_avatar": "https://avatars.githubusercontent.com/u/23100055?v=4&size=64",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "65928f8642170000ca0029a9",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/44336253008eff501b0ffce958846462.png?type=webp&imageView&quality=95&thumbnail=245x245"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "网易云音乐氧气有线入耳式耳机",
    type: "图书",
    "user_avatar": "https://avatars.githubusercontent.com/u/23100055?v=4&size=64",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "65928f8642170000ca0029aa",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/a5d9998f5c5ce4e46e30332470ea0df7.png?type=webp&imageView&quality=95&thumbnail=245x245"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "萤石CP1全景云台摄像头",
    type: "全部",
    "user_avatar": "https://avatars.githubusercontent.com/u/23100055?v=4&size=64",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "65928f8642170000ca0029ab",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/3bea5d636372f05d46d75b138a7830b5.jpeg?type=webp&imageView&quality=95&thumbnail=245x245"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "启航8A插线板",
    type: "户外",
    "user_avatar": "https://avatars.githubusercontent.com/u/23100055?v=4&size=64",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "65928f8642170000ca0029ac",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/f75b31dda9f2884b88bd04c213c075c6.jpg?type=webp&imageView&quality=95&thumbnail=245x245"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "松下微波炉NN-SM30NW",
    type: "家电",
    "user_avatar": "https://avatars.githubusercontent.com/u/23100055?v=4&size=64",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "65928f8642170000ca0029ad",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/1ac1f85de373b25ceb983b9f89fe5d1c.jpg?type=webp&quality=95&thumbnail=245x245&imageView"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "科大 讯飞方案丨智能AI词典笔5.0丨全科学习",
    type: "数码",
    "user_avatar": "https://avatars.githubusercontent.com/u/23100055?v=4&size=64",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "6592ce6e42170000ca0029ae",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/ccbdb87b3a9bd12fcedd0946dd7df4a8.png?type=webp&imageView&quality=95&thumbnail=245x245"
    ],
    location: "广州市",
    price: "116",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "钛搏漫威钢铁侠MK46超可动高速USB3.0闪存盘",
    type: "全部",
    "user_avatar": "https://avatars.githubusercontent.com/u/23100055?v=4&size=64",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: "6592cf3642170000ca0029af",
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/a0a90b7838ea764e7c42b02ce873ccce.jpg?type=webp&imageView&quality=95&thumbnail=245x245"
    ],
    location: "广州市",
    price: "189",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "VGO智能高速负离子护发吹风机",
    type: "全部",
    "user_avatar": "https://avatars.githubusercontent.com/u/23100055?v=4&size=64",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("659d6f4db0965f11226a2324"),
    title: "名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称",
    desc: "闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍闲置介绍",
    type: "数码",
    location: "东城区",
    price: "999",
    images: [
        "/uploads/1704816456242-dami.jpg",
        "/uploads/1704816458285-niujianzi.jpg",
        "/uploads/1704816460981-pingguo.jpg"
    ],
    "publish_time": "2024-01-10 00:07:41",
    "user_avatar": "https://ooo.0x0.ooo/2023/01/16/QR57a.jpg",
    "publish_user": "测试账号",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("65a0101c0ace63f04cb3b3d3"),
    title: "VGO智能高速负离子护发吹风机",
    desc: "222222",
    type: "数码",
    location: "河东区",
    price: "4444",
    images: [
        "/uploads/1704988696846-qun.jpg"
    ],
    "publish_time": "2024-01-11 23:58:20",
    "user_avatar": "https://ooo.0x0.ooo/2023/01/16/QR57a.jpg",
    "publish_user": "测试账号",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("65a0103ed229ba6cf7d97f1a"),
    title: "22222222",
    desc: "test",
    type: "图书",
    location: "秦皇岛市",
    price: "999",
    images: [
        "/uploads/1704988733369-dami.jpg"
    ],
    "publish_time": "2024-01-11 23:58:54",
    "user_avatar": "https://ooo.0x0.ooo/2023/01/16/QR57a.jpg",
    "publish_user": "测试账号",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
db.getCollection("goods").insert([ {
    _id: ObjectId("65a014911a3c0000de007a72"),
    "publish_time": "2023-12-23 00:00:00",
    images: [
        "https://yanxuan-item.nosdn.127.net/34c06627db2be472b1b1d469ef02603a.png?type=webp&quality=95&thumbnail=265x265&imageView"
    ],
    location: "广州市",
    price: "5500",
    "publish_user": "我是谁",
    desc: "描述描述描述描述",
    title: "任天堂Switch 续航增强版 国行",
    type: "全部",
    "user_avatar": "https://avatars.githubusercontent.com/u/23100055?v=4&size=64",
    "publish_user_id": "6587edff16e3d9df0b80b8dc",
    status: 0
} ]);
