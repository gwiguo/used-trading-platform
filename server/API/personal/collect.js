const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const { goods_id, user_id } = req.body;

    __connectDB(async (db, client) => {
        try {
            const result = await db.collection("personal").find({ user_id:new ObjectId(user_id) }).project({ collected: 1 }).toArray()
            console.log(result);
            let collected = result.length && result[0].collected || [];
            console.log('-------------');
            console.log(collected);
            if (collected.includes(goods_id)) {
                collected = collected.filter(item => item != goods_id)
            } else {
                collected.push(goods_id)
            }
            await db.collection("personal").updateOne({ user_id: new ObjectId(user_id) }, {
                $set: {
                    collected: collected
                }
            })
            res.send({
                code: 200
            })
        } catch (error) {
            console.log(error);
            res.send({
                code: -1
            })
        } finally {
            client.close();
        }
    });
}