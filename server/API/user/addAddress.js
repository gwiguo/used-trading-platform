const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
    const { payload, _id } = req.body;

    __connectDB(async (db, client) => {
        try {

            console.log(payload);

            console.log(_id);

            const result = await db.collection("user").find({ _id:new ObjectId(_id) }).project({ address: 1 }).toArray()

            console.log(result);
            let address = result[0].address || []
            console.log(address);

            address.push(payload)

            console.log(address);

            await db.collection("user").updateOne({ _id: new ObjectId(_id) }, {
                $set: {
                    address
                }
            })
            res.send({
                code: 200
            })
        } catch (error) {
            res.send({
                code: -1
            })
        } finally {
            client.close();
        }
    });
}