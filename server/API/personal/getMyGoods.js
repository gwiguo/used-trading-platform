const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const { user_id } = req.query;

    __connectDB(async (db, client) => {
        try {
            const data = await db.collection("order").find({ 
                user_id
            }).toArray()

            console.log(data);
    
    
            res.send({
                code:200,
                data
            })
            
        } catch (error) {
            console.log(error);
            res.send({
                code: -1
            });            
        } finally {
            client.close();
        }
        // .then((data) => {
        //     res.send({
        //         code: 200,
        //         data
        //     });
        // }).catch(err => {
        //     console.log(err);
        //     res.send({
        //         code: -1
        //     });
        // }).finally(() => {
        //     client.close();
        // })
    });
}