const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const { _id } = req.query;

    __connectDB((db, client) => {
        console.log(`reply_user_id：${_id}`);
        db.collection("comment").find({reply_user_id:_id}).toArray()
            .then((data) => {

                res.send({
                    code: 200,
                    data
                });
                client.close(); 
            }).catch(err => {
                console.log(err);
                res.send({
                    code: -1
                });
                client.close();
            })
    });
}