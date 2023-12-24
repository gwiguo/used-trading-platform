const { __connectDB } = require("../db/mongo.js");

exports.post = async (req, res) => {
    const whereSqlArr = {};
    // req.body.uname !== undefined && req.body.uname.trim() != "" && (whereSqlArr['uname'] = new RegExp(req.body.uname));        
    // req.body.usex !== undefined && req.body.usex.trim() != "" && (whereSqlArr['sex'] = req.body.usex);
    // req.body.uaddress !== undefined && req.body.uaddress.trim() != "" && (whereSqlArr['uaddress'] = new RegExp(req.body.uaddress));  
    // req.body.ubirth !== undefined && req.body.ubirth.trim() != "" && (whereSqlArr['birth'] = new RegExp(req.body.ubirth));  
    // console.log(whereSqlArr);
    __connectDB((db, client) => {
        console.log('查询用户...');
        db.collection("user").find(whereSqlArr).toArray()
            .then((data) => {
                console.log('查询成功！');
                res.send({
                    code: 0,
                    list: data,
                    count: data.length
                });
            }).catch(err => {
                console.log(err);
                res.send({
                    code: -1
                });
            }).finally(() => {
                console.log('关闭数据库连接');
                client.close();
            })
    });
}