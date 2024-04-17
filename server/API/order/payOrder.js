const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const {_id,of_user_id,goods_id,pay_status,pay_way,order_status,pay_time} = req.body;

    __connectDB( async (db, client) => {
        try {
            const payRes =  db.collection("order").updateOne({_id:new ObjectId(_id)},{
                $set:{
                    pay_status,
                    pay_way,
                    order_status,
                    pay_time,
                }
            })
            console.log('------payRes------');
            console.log(payRes);
            if(payRes.modifiedCount !== 0){

                const personalResult = await db.collection("personal").findOne(
                    {
                        user_id:new ObjectId(of_user_id)
                    }
                );
        
                console.log('------------personalResult：-----------');
                console.log(personalResult);
        
                personalResult.sold.push(new ObjectId(goods_id))
        
                console.log(`sold：${personalResult}`);
        
                const upadteResult =  await db.collection("personal").updateOne(
                    {
                        _id: personalResult._id
                    },
                    {
                        $set:{
                            sold:personalResult.sold
                        }
                    }
                );
        
                console.log(`upadteResult：${`upadteResult`}`);

                const updateGoodsStatusRes =  await db.collection("goods").updateOne(
                    {
                        _id:new ObjectId(goods_id)
                    },
                    {
                        $set:{
                            status : 0 //  1正常 -1下架 0 已卖出
                        }
                    }
                )

                console.log('-------------updateGoodsStatusRes----------');
                console.log(updateGoodsStatusRes);

                res.send({
                    code: 200
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