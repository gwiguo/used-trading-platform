const { MongoClient } = require('mongodb');

module.exports = {
    async __connectDB(cb) {
        const client = new MongoClient("mongodb://0.0.0.0:27017");
        await client.connect();
        const db = await client.db("usedTradingPlatform");
        console.log('-----------------');
        console.log('连接数据库成功');
        console.log('-----------------');
        cb(db, client);
    }
};