const mongodb = require('../db/mongo');

module.exports = {
    /**
     * 查询
     * @param collection 集合名称
     * @param params 查询条件
     * @param cb
     */
    query: function (collection, params, cb) {
        mongodb.connect(function (db) {
            db.collection(collection)
                .find(params)
                .toArray(function (err, results) {
                    cb(err, results,db);
                });
            db.close();
        });
    },

    /**
     * 查询一条记录
     * @param collection 集合名称
     * @param params 查询条件
     * @param cb
     */
    queryOne: function (collection, params, cb) {
        mongodb.connect(function (db) {
            db.collection(collection).findOne(params, function (err, results) {
                cb(err, results);
            });
        });
    },


    /**
     * 查询所有数据(分页)
     * @param collection 集合名称
     * @param obj 查询参数
     * @param cb
     */
    queryAll: function (collection, obj, cb) {
        obj.params = obj.params || {};
        obj.sortObj = obj.sortObj || {};
        obj.limit = obj.limit || 10;
        obj.page = obj.page || 0;
        obj.skip = obj.limit * obj.page;
        mongodb.connect(function (db) {
            db.collection(collection)
                .find(obj.whereObj)
                .sort(obj.sortObj)
                .limit(obj.limit)
                .skip(obj.skip)
                .toArray(function (err, results) {
                    cb(err, results);
                });
        });
    },

    /**
     * 插入一条数据
     * @param collection 集合名称
     * @param obj 数据
     * @param cb 返回值
     */
    insert: function (collection, obj, cb) {
        mongodb.connect(function (db) {
            db.collection(collection).insertOne(obj, function (err, results) {
                cb(err, results);
            })
        });

    },

    /**
     * 批量插入数据
     * @param collection 集合名称
     * @param arr 数组
     * @param cb 返回值
     */
    insertBatch: function (collection, arr, cb) {
        mongodb.connect(function (db) {
            db.collection(collection).insertMany(obj, function (err, results) {
                cb(err, results);
            })
        });

    },

    /**
     * 修改一条记录
     * @param collection 集合名称
     * @param whereObj 条件
     * @param upObj 更新内容
     * @param cb 返回值
     */
    update: function (collection, whereObj, upObj, cb) {
        mongodb.connect(function (db) {
            db.collection(collection).updateOne(whereObj, upObj, function (err, results) {
                cb(err, results);
            })
        });
    },

    /**
     * 删除一条记录
     * @param collection 集合名称
     * @param whereObj 条件
     * @param cb 返回值
     */
    delete:function(collection,whereObj,cb){
        mongodb.connect(function(db) {
            db.collection(collection).deleteOne(whereObj, function (err, results) {
                cb(err, results);
            })
        });
    }

};