const { __connectDB } = require("../../db/mongo.js");

module.exports = async (req, res) => {
    const { pageNum, pageSize} = req.query;
    
    __connectDB((db, client) => {
        db.collection("order").find().skip(parseInt(pageSize) * (pageNum - 1)).limit(parseInt(pageSize)).sort({publish_time:-1}).toArray()
            .then(async (data) => {
                const total = await db.collection("order").countDocuments();
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