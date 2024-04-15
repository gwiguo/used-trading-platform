const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const { _id } = req.query;
    const where = {};
    __connectDB((db, client) => {
        db.collection("user").find({_id:new ObjectId(_id)}).project({address:1,_id:false}).toArray()
            .then((data) => {
                console.log(data);
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