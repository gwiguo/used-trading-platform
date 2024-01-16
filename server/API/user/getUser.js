const { __connectDB } = require("../../db/mongo.js");

module.exports = async (req, res) => {
    const where = {};
    __connectDB((db, client) => {
        db.collection("user").find(where).toArray()
            .then((data) => {
                res.send({
                    code: 200,
                    list: data,
                    count: data.length
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