    var db = require('../db/dbhelper.js');
var jwt = require('jsonwebtoken');
var apiresult = require('../modules/apiresult');
var bp = require('body-parser');

module.exports = {
	register: function(app){

        // 接收json请求
        app.use(bp.json());
        // 解析utf-8
        app.use(bp.urlencoded({ extended: false }));

		app.post('/login',function(req, res){

			db.mongodb.select('user', req.body, function(result){
                if(result.state && result.data.length > 0){
                    var token = jwt.sign({username: req.body.username}, 'abc', {
                        expiresIn: 1440
                    })
                    res.send(apiresult(true, {token: token}));
                } else {
                    res.send(apiresult(false, result.data));
                }
            })
		}),

        //增
        app.post('/add',function(req, res){

            db.mongodb.insert('user', req.body, function(result){//user为MongoDB里的集合
                res.send(apiresult(true,result.data))
            })
        }),
        //查
        app.post('/ser',function(req, res){

            db.mongodb.select('user', req.body, function(result){
                 res.send(apiresult(true,result.data))
            })
        }),
        //删
        app.post('/del',function(req, res){
            console.log(req.body)
            db.mongodb.delete('user', req.body, function(result){
                res.send(apiresult(true,result.data))
            })
        }),
        //改
        app.post('/up',function(req, res){
            console.log(req.body)
            //传一个字段名加对象的数组过去，
            db.mongodb.update('user',[{username:req.body.username},req.body] , function(result){
               
                res.send(apiresult(true, result.data));
                
            })
        })


    }
}