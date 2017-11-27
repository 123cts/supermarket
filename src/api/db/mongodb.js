var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var db;
var apiresult = require('../modules/apiresult');

// var connstr = 'mongodb://10.3.135.38:27017/market';
var connstr = 'mongodb://127.0.0.1:27017/market';
// var url = "mongodb://10.3.131.23:27017/market";

MongoClient.connect(connstr, function(_err, _db) {

    if(_err){
        console.log(_err);
    } else {
        db = _db;
    }
});

module.exports = {

    //增
   insert : function(_collection, _data, _cb){
        db.collection(_collection).insert(_data, function(error, result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    //查
    select: function(_collection, _condition, _cb){
        db.collection(_collection).find(_condition || {}).toArray(function(error, result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },
   //改
    update: function(_collection, arr, _cb){
        db.collection(_collection).update(arr[0],{$set:arr[1]},function(error, result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    //删
    delete: function(_collection, _condition, _cb){
        db.collection(_collection).remove(_condition, function(error, result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },


    // //增
    //  insert: function(_collection, _data, _callback){
    //     var i = db.collection(_collection).insert(_data).then(function(result){
    //         console.log(_data)
    //         _callback(result);
    //     });
    // },
    //  //查
    // select: function(_collection, _condition, _callback){
    //     var i = db.collection(_collection).find(_condition || {}).toArray(function(error, dataset){
    //         _callback({status: true, data: dataset});
    //     });
    // },
    // //改
    // update: function(_collection, arr, _callback){
    //     console.log(arr)
    //     //arr[0]为要修改的文档的标识，arr[1]为修改的内容
    //     var i = db.collection(_collection).update(arr[0],{$set:arr[1]}).then(function(result){
    //         // console.log(result)
    //         _callback(result);
    //     });
    // },
    // //删
    // delete: function(_collection, _condition, _callback){
    //     var i = db.collection(_collection).remove(_condition).then(function(result){
    //         _callback(result);
    //     });
    // }
    

}