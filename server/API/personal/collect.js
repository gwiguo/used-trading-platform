const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const { goods_id, user_id } = req.body;

    __connectDB(async (db, client) => {
        try {
            const result = await db.collection("personal").find({ user_id }).project({ collected: 1 }).toArray()
            let collected = result[0].collected
            if (collected.includes(goods_id)) {
                collected = collected.filter(item => item != goods_id)
            } else {
                collected.push(goods_id)
            }
            await db.collection("personal").updateOne({ _id: new ObjectId(result[0]._id) }, {
                $set: {
                    collected: collected
                }
            })
            res.send({
                code: 200
            })
        } catch (error) {
            res.send({
                code: -1
            })
        } finally {
            client.close();
        }
        // db.collection("personal").findOne(where)
        //     .then((data) => {
        //         res.send({
        //             code: 200,
        //             data
        //         });
        //     }).catch(err => {
        //         console.log(err);
        //         res.send({
        //             code: -1
        //         });
        //     }).finally(() => {
        //         client.close();
        //     })
    });
}