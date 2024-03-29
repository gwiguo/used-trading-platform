const { __connectDB } = require("../db/mongo.js");

module.exports = async (req, res) => {
    const { account, password } = req.body;
    const where = {};
    account !== undefined && account.trim() != "" && (where['account'] = account);
    password !== undefined && password.trim() != "" && (where['password'] = password);
    // console.log(req.rawHeaders);
    console.log(where);
    __connectDB((db, client) => {
        db.collection("user").find(where).toArray()
            .then((data) => {
                res.send({
                    code: data.length ? 200 : -1,
                    data: data[0]
                });
            }).catch(err => {
                console.log(err);
                res.send({
                    code: -1
                });
            }).finally(() => {
                client.close();
            })
    });
}
