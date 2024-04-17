const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const { user_id } = req.query;

    __connectDB(async (db, client) => {
        try {
            const data = await db.collection("personal").findOne({ 
                user_id
            },{projection:{collected:1,_id:0}})

            console.log(data);    
    
            res.send({
                code:200,
                data: data && data.collected || []
            })
            
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