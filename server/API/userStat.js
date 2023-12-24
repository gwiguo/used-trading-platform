const db = require("../db/mongo.js");
const { __connectDB } = require("../db/mongo.js");


exports.post = (req, res) => {
    __connectDB((db,client)=>{
        db.collection("test").find({}).toArray((err,data)=>{
            if(err) {
                client.close();
                return res.send({
                    code:-1
                })
            }

            const [sexObj,birthObj,provinceObj,zyObj] = [{},{},{},{}];
    
            data.forEach(obj=>{
                console.log(typeof obj.uaddress);
                if(!sexObj[obj.sex]){
                    sexObj[obj.sex] = 1;
                }else{
                    sexObj[obj.sex]++;
                }
                if(!birthObj[obj.birth]){
                    birthObj[obj.birth] = 1;
                }else{
                    birthObj[obj.birth]++;
                }
                if(!provinceObj[obj.uaddress].split("\/")[0]){
                    provinceObj[obj.uaddress] = 1;
                }else{
                    provinceObj[obj.uaddress]++;
                }
                
                if(!zyObj[obj.uzy]){
                    zyObj[obj.uzy] = 1;
                }else{
                    zyObj[obj.uzy]++;
                }
                
            });
    
            res.send({
                data:{
                    sex:sexObj,
                    birth:birthObj,
                    province:provinceObj,
                    zy:zyObj
                },
                code:0
            });  
            client.close();
        })
    });
}