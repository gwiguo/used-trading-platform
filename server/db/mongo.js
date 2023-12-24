const { MongoClient } = require('mongodb');
const config = require("../db/config");

module.exports = {
    async __connectDB(cb) {
        const client = new MongoClient(config.MONGODB_URL);
        await client.connect();
        const db = await client.db(config.DB_NAME);
        console.log('-----------------');
        console.log('连接数据库成功');
        console.log('-----------------');
        cb(db, client);
    }
};