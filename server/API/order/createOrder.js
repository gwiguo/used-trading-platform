const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const data = req.body;

    __connectDB( async (db, client) => {
        try {
            const insertOrderRes = await db.collection("order").insertOne(data)

            if(insertOrderRes.insertedId){
                
                
                const personalResult = await db.collection("personal").findOne(
                    {
                        user_id:new ObjectId(data.user_id)
                    }
                );

                console.log('------------personalResult：-----------');
                console.log(personalResult);

                personalResult.bought.push(insertOrderRes.insertedId)

                console.log(`bought：${personalResult}`);

                const upadteResult =  await db.collection("personal").updateOne(
                    {
                        _id: personalResult._id
                    },
                    {
                        $set:{
                            bought:personalResult.bought
                        }
                    }
                );

                console.log(`upadteResult：${`upadteResult`}`);

                res.send({
                    code: 200,
                    data: {
                        order_id: insertOrderRes.insertedId
                    }
                });

            }else{
                res.send({
                    code: -1
                });
            }

        } catch (error) {
            console.log(error);
            res.send({
                code: -1
            });            
        } finally {
            client.close();
        }
    });
}