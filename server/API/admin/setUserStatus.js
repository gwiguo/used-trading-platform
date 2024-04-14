const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb");

module.exports = async (req, res) => {
    const { _id, status } = req.body;
    
    __connectDB(async (db, client) => {
        try {
            console.log(_id);
            console.log(`用户修改前的状态：${status}`);
            const updateResult =  await db.collection("user").updateOne({_id:new ObjectId(_id)},{
                $set:{
                    status:!status
                }
            })
            console.log(updateResult);
            if(updateResult.modifiedCount !== 0){
                res.send({
                    code:200
                })
            }else{
                res.send({
                    code:-1                   
                })
            }
            
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