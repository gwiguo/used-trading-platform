const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const { user_id } = req.query;

    __connectDB(async (db, client) => {
        try {
            // console.log("category：",category);
            // console.log(user_id);
            // const result = await db.collection("personal").find({ user_id }).toArray()

            // console.log("result：",result);
            
            // const goodsIdList = result[0][category] || []
    
            // const idList = []
            // for (let i = 0; i < goodsIdList.length; i++) {
            //     idList.push({goods_id:goodsIdList[i]})            
            // }
    
            // console.log("idList：",idList);

            // console.log("where：",{ 
            //     user_id,
            //     category,
            //     $or:idList
            // });
    
            const data = await db.collection("order").find({ 
                user_id
            }).toArray()
    
    
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