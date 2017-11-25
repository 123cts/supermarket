var mongodb = require('mongodb');
var client = mongodb.MongoClient;
var connstr = 'mongodb://127.0.0.1:27017/cashier';

var apiresult = require('../modules/apiResult');

var db;
client.connect(connstr, function(_error, _db){
    if(_error){
        console.log(_error);
    } else {
        db = _db;
    }
})

module.exports = {
    select: function(_collection, _condition, _cb){
        db.collection(_collection).find(_condition || {}).toArray(function(error, result){
            // console.log(error);
            // var _r = true;
            // if(error){
            //     _r = false;
            // }
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    insert : function(_collection, _data, _cb){
        db.collection(_collection).insert(_data, function(error, result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    update: function(_collection, _data, _cb){
         db.collection(_collection).update(_data, function(error, result){
            _cb(apiresult(error ? false : true, error || result));
        })
    },
    delete: function(_collection, _data, _cb){
        db.collection(_collection).remove(_data,function(error,result){
            _cb(apiresult(error ? false : true, error || result));
        })
    }
}