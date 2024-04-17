const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const { _id,nickname,password,avatar } = req.body;

    __connectDB(async (db, client) => {
        try {
            const updateResult = await db.collection("user").updateOne({ _id: new ObjectId(_id) }, {
                $set: {
                    nickname,
                    password,
                    avatar
                }
            })
            if(updateResult.modifiedCount !== 0){     
                const updateGoodsPublishUser = await db.collection("goods").updateMany({publish_user_id: _id},{
                    $set:{
                        publish_user:nickname,
                        user_avatar:avatar
                    }
                })           
                console.log('-------updateGoodsPublishUser------');
                console.log(updateGoodsPublishUser);
                res.send({
                    code: 200,
                    msg:"信息修改成功~"
                })
            }else{
                res.send({
                    code:-1,
                    msg:"修改失败！"
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