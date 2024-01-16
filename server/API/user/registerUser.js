const { __connectDB } = require("../../db/mongo.js");

module.exports = async (req, res) => {
    const { account, password } = req.body;
    __connectDB(async (db, client) => {
        const findResult = await db.collection("user").find({ account }).toArray();
        if (findResult.length) {
            res.send({
                code: -1,
                message: "用户名已存在！"
            });
        } else {
            const insertResult = await db.collection("user").insertOne({ account, password, role: "", nickname: account, status: true });
            if (insertResult.insertedId) {
                res.send({
                    code: 200
                });
            }

        }
        client.close();
    });
}