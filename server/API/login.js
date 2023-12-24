const { __connectDB } = require("../db/mongo.js");

exports.post = async (req, res) => {
    const { user_name,user_password } = req.body;
    const whereSqlArr = {};
    user_name !== undefined && user_name.trim() != "" && (whereSqlArr['user_name'] = user_name); 
    user_password !== undefined && user_password.trim() != "" && (whereSqlArr['user_password'] = user_password);        
    // console.log(req.rawHeaders);
    console.log(whereSqlArr);
    __connectDB((db,client)=>{
        db.collection("login").find(whereSqlArr).toArray((err,data)=>{
            if(err){
                client.close();
                return res.send({
                    code: -1
                });                
            }
            res.send({
                code: 0,
                list: data,
                count:data.length
            });
            client.close();
        })
    });
}
