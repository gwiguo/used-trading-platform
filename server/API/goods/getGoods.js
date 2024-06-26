const { __connectDB } = require("../../db/mongo.js");

module.exports = async (req, res) => {
    const { type, title, pageNum } = req.query;

    const where = {
        type: { $regex: type == '全部' ? '' : type },
        title: { $regex: title || "" },
        status:1 // 1正常 -1下架 0 已卖出
    };

    __connectDB((db, client) => {
        console.log(where);
        db.collection("goods").find(where).sort({publish_time:-1}).skip(10 * (pageNum - 1)).limit(10).toArray()
            .then(async (data) => {
                const total = await db.collection("goods").countDocuments(where);
                res.send({
                    code: 200,
                    list: data,
                    total
                });
            }).catch(err => {
                console.log(err);
                res.send({
                    code: -1
                });
            }).finally(() => {
                client.close();
            })
    });
}