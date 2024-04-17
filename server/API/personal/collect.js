const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const { goods_id, user_id } = req.body;

    __connectDB(async (db, client) => {
        try {
            const result = await db.collection("personal").findOne({ user_id },{ collected: 1 })

            // console.log(result);
            
            let collected = result && result.collected || [];
            console.log('-------------');
            console.log(collected);
            if (collected.includes(goods_id)) {
                collected = collected.filter(item => item != goods_id)
            } else {
                collected.push(goods_id)
            }
            console.log(collected);
            await db.collection("personal").updateOne({ user_id }, {
                $set: {
                    collected
                }
            })

            const newCollected = await db.collection("personal").findOne({user_id},{projection:{collected:1,_id:0}})

            console.log(newCollected);

            res.send({
                code: 200,
                data: newCollected && newCollected.collected || []
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