const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const { _id, user_id, category } = req.query;

    if (!_id) return res.send({
        code: -1
    });
    const where = {
        _id: new ObjectId(_id),
        user_id,
        category
    };

    __connectDB(async (db, client) => {
        console.log(where);
        try {
            const data = await db.collection("order").findOne(where)
            res.send({
                code: 200,
                data
            });
            // .then((data) => {
            //     console.log(data);
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

        } catch (error) {
            console.log(error);
            res.send({
                code: -1
            });

        }
    });
}