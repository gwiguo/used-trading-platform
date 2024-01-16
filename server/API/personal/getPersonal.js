const { __connectDB } = require("../../db/mongo.js");

module.exports = async (req, res) => {
    const { user_id } = req.query;
    const where = {
        user_id
    };

    __connectDB((db, client) => {
        console.log(where);
        db.collection("personal").findOne(where)
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