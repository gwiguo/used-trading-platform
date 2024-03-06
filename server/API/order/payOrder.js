const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const {_id,pay_status,pay_way,order_status,pay_time} = req.body;

    __connectDB((db, client) => {
        db.collection("order").updateOne({_id:new ObjectId(_id)},{
            $set:{
                pay_status,
                pay_way,
                order_status,
                pay_time,
            }
        })
            .then((data) => {
                res.send({
                    code: 200
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