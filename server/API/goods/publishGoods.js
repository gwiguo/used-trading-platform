const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb");

module.exports = async (req, res) => {
    const data = req.body;

    __connectDB( async (db, client) => {

        console.log(`publish_user_id：${data.publish_user_id}`);

        const insertResult = await db.collection("goods").insertOne(data);

        console.log(`insertResult：${insertResult}`);
        console.log(`insertResult.insertedId：${insertResult.insertedId}`);
        

        const personalResult = await db.collection("personal").findOne(
            {
                user_id:new ObjectId(data.publish_user_id)
            }
        );

        console.log('------------personalResult：-----------');
        console.log(personalResult);

        personalResult.published.push(insertResult.insertedId)

        console.log(`published：${personalResult}`);

        const upadteResult =  await db.collection("personal").updateOne(
            {
                _id: personalResult._id
            },
            {
                $set:{
                    published:personalResult.published
                }
            }
        );

        console.log(`upadteResult：${`upadteResult`}`);
        
        res.send({
            code: 200,
            data:{
                insertedId:insertResult.insertedId
            }
        });

        client.close();
    });
}