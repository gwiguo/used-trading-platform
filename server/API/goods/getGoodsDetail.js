const { ObjectId } = require("mongodb");
const { __connectDB } = require("../../db/mongo.js");

module.exports = async (req, res) => {
    const { _id } = req.query;
    if (!_id) {
        return res.send({
            code: -1
        });
    }
    const where = {
        _id: new ObjectId(_id)
    };

    __connectDB((db, client) => {
        console.log(where);
        try {
            db.collection("goods").findOne(where)
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

        } catch (error) {
            res.send({
                code: -1
            });

        }
    });
}