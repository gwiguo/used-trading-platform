const { __connectDB } = require("../../db/mongo.js");

module.exports = async (req, res) => {
    const data = req.body;

    __connectDB( async (db, client) => {
        const insertResult = await db.collection("goods").insertOne(data);

        const personalResult = await db.collection("personal").findOne(
            {
                user_id:data.publish_user_id
            },
            {
                projection:{
                    published:1,
                    _id:1
                }
            }
        );

        console.log(personalResult);

        await db.collection("personal").updateOne(
            {
                _id: personalResult._id
            },
            {
                $set:{
                    published:personalResult.published.push(personalResult.insertedId)
                }
            }
        );

        console.log(personalResult);

        db.collection("goods").insertOne(data)
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