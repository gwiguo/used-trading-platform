const { __connectDB } = require("../../db/mongo.js");

module.exports = async (req, res) => {
    const { user_id, category } = req.query;

    __connectDB(async (db, client) => {
        console.log({
            [category]: 1
        });
        console.log(user_id);
        const result = await db.collection("personal").find({ user_id }).project({
            [category]: 1
        }).toArray()

        const goods = await db.collection("goods").find({ user_id })

        res.send(result)
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