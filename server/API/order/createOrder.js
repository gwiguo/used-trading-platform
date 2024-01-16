const { __connectDB } = require("../../db/mongo.js");

module.exports = async (req, res) => {
    const data = req.body;

    __connectDB((db, client) => {
        db.collection("order").insertOne(data)
            .then((data) => {
                res.send({
                    code: 200,
                    data: {
                        order_id: data.insertedId
                    }
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