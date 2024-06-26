const { __connectDB } = require("../../db/mongo.js");
const { ObjectId } = require("mongodb")

module.exports = async (req, res) => {
	const { account, password } = req.body;
	__connectDB(async (db, client) => {
		const findResult = await db
			.collection("user")
			.find({ account })
			.toArray();
		if (findResult.length) {
			res.send({
				code: -1,
				message: "用户名已存在！",
			});
		} else {
			const insertResult = await db
				.collection("user")
				.insertOne({
					account,
					password,
					role: "user",
					nickname: account,
					status: true,
					avatar: "/uploads/default.png",
					address:[]
				});
			if (insertResult.insertedId) {
                const user_data =  await db.collection("user").findOne({_id:insertResult.insertedId})
                if(user_data){
                    res.send({
                        code: 200,
                        data:user_data
                    });
					const personResult =  await db.collection("personal").insertOne({
						user_id:insertResult.insertedId,
						collected:[],
						published:[],
						removed:[],
						sold:[],
						bought:[],
					})
					console.log(personResult);
                }else{
                    res.send({
                        code: -1
                    });
                }
			}
		}
        client.close();
	});
};
