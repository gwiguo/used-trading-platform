const { __connectDB } = require("../../db/mongo.js");

module.exports = async (req, res) => {
    const { goods_id } = req.query;
    const where = {
        goods_id
    };

    __connectDB((db, client) => {
        console.log(where);
        db.collection("comment").find(where).sort({ time: -1 }).toArray()
            .then((data) => {
                res.send({
                    code: 200,
                    data
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