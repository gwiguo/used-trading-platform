const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const { user_id } = req.query;

    __connectDB(async (db, client) => {
        const findResult = await db.collection("personal").findOne({ user_id : new ObjectId(user_id) })
        console.log('-------findResult：-------');
        console.log(findResult);

        
        if(findResult){
            const data = {};
            // 我买到的
            if(findResult.bought.length){
                const bought = await db.collection("order").find({ user_id },{
                    sort:{
                        create_time: -1
                    },
                    projection:{
                        goods_cover:1,
                        goods_title:1,
                        goods_desc:1,
                        create_time:1,
                        goods_price:1
                    }
                })
                data.bought = [];
                for await (const doc of bought) {
                    data.bought.push(doc);
                }
            }
            // 我发布的
            if(findResult.published.length){
                const published = await db.collection("goods").find({ publish_user_id:user_id },{
                    sort:{
                        publish_time: -1
                    },
                    projection:{
                        images:1,
                        title:1,
                        desc:1,
                        publish_time:1,
                        price:1
                    }
                })
                data.published = [];
                for await (const doc of published) {
                    data.published.push(doc);
                }

                data.published.forEach(item=>{
                    item.goods_cover = item.images[0]
                    item.goods_title = item.title;
                    item.goods_desc = item.desc;
                    item.create_time = item.publish_time;
                    item.goods_price = item.price;
                    delete item.images
                    delete item.title
                    delete item.desc
                    delete item.publish_time
                    delete item.price
                })

            }
            // 我收藏的
            if(findResult.collected.length){
                const collected = await db.collection("goods").find({ 
                    _id:{
                        $in:findResult.collected
                    }
                 },{
                    sort:{
                        publish_time: -1
                    },
                    projection:{
                        images:1,
                        title:1,
                        desc:1,
                        publish_time:1,
                        price:1
                    }
                })
                data.collected = [];
                for await (const doc of collected) {
                    data.collected.push(doc);
                }
                data.collected.forEach(item=>{
                    item.goods_cover = item.images[0]
                    item.goods_title = item.title;
                    item.goods_desc = item.desc;
                    item.create_time = item.publish_time;
                    item.goods_price = item.price;
                    delete item.images
                    delete item.title
                    delete item.desc
                    delete item.publish_time
                    delete item.price
                })
            }
            // 我下架的
            if(findResult.removed.length){
                // console.log(findResult.removed);
                const removed = await db.collection("goods").find({ 
                    _id:{
                        $in: findResult.removed
                    },
                    status:-1
                 },{
                    sort:{
                        publish_time: -1
                    },
                    projection:{
                        images:1,
                        title:1,
                        desc:1,
                        publish_time:1,
                        price:1,
                        status:1
                    }
                })
                data.removed = [];
                for await (const doc of removed) {
                    data.removed.push(doc);
                }
                data.removed.forEach(item=>{
                    item.goods_cover = item.images[0]
                    item.goods_title = item.title;
                    item.goods_desc = item.desc;
                    item.create_time = item.publish_time;
                    item.goods_price = item.price;
                    delete item.images
                    delete item.title
                    delete item.desc
                    delete item.publish_time
                    delete item.price
                })
            }

            // 我卖出的
            if(findResult.sold.length){
                const sold = await db.collection("goods").find({ 
                    _id:{
                        $in:findResult.sold
                    }
                 },{
                    sort:{
                        publish_time: -1
                    },
                    projection:{
                        images:1,
                        title:1,
                        desc:1,
                        publish_time:1,
                        price:1,
                        status:1
                    }
                })
                data.sold = [];
                for await (const doc of sold) {
                    data.sold.push(doc);
                }
                data.sold.forEach(item=>{
                    item.goods_cover = item.images[0]
                    item.goods_title = item.title;
                    item.goods_desc = item.desc;
                    item.create_time = item.publish_time;
                    item.goods_price = item.price;
                    delete item.images
                    delete item.title
                    delete item.desc
                    delete item.publish_time
                    delete item.price
                })
            }

            res.send({
                code: 200,
                data
            });
        }else{
            res.send({
                code: -1
            });
        }
        // 关闭数据库连接
        client.close();
    });
}