const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb");

module.exports = async (req, res) => {
    const { _id } = req.body;
    
    __connectDB(async (db, client) => {
        try {
            console.log(_id);
            const deleteResult =  await db.collection("order").deleteOne({_id:new ObjectId(_id)})
            console.log(deleteResult);
            if(deleteResult.deletedCount){
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