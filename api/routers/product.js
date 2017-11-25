var db = require('../db/dbhelper');
var http = require('http');
var url = require('url');

module.exports = {
    register: function(app){
        app.get('/getproduct', function(req, res){
            // var products = req.body.products;
            db.mongodb.select('goods',{},function(result){
                // console.log(result)
                res.send(result.data)
            })
        })
        app.post('/delproduct', function(req, res){
            // var products = req.body.products;
            db.mongodb.delete('goods',req.body,function(result){
                console.log(req.body)
                res.send(result.data)
            })
        })
        app.post('/updateproduct', function(req, res){
            var products = req.body.products;
            db.mongodb.update('goods',{},function(result){
                console.log(result)
                res.send(result.data)
            })
        })
        app.post('/insertproduct', function(req, res){
            var products = req.body.products;
            db.mongodb.insert('goods',{_id:req.body._id,name:req.body.name},function(result){
                console.log(result)
                res.send(result.data)
            })
        })
    }
}