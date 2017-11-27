/* 
* @Author: Joe
* @Date:   2017-11-27 09:13:59
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-27 09:16:32
*/

var bodyparser = require("body-parser");
var urlencode = bodyparser.urlencoded({extended: false});
var db = require('../db/dbhelper.js');
var jwt = require('jsonwebtoken');
var apiresult = require('../modules/apiresult');

module.exports = {
    Register: function(app){
        //post请求
        app.post("/product", function(request, response){
            var data = request.body;
            db.select("product", data, function(result){
                    console.log(result)
                    response.send(result);
                });
        });
     
        //添加
        app.post('/addproduct', function(request, response){
            var data = request.body;
            console.log(request.body)
            db.insert('product', data, function(result){
                // console.log(result);
                response.send({state: true});
            });
        });

         //删除
         app.post('/delProduct', function(request, response){
             var data = request.body;
             console.log(data);
             db.delete('product', data, function(result){
                 response.send({state: true});
             })
         })

         //修改
         app.post('/updateproduct', function(request, response){
             var data = request.body;
              console.log(data);
             db.update('product', [{code: request.body.code},{
                 name:request.body.name,
                 type:request.body.type,
                 number:request.body.number,
                 unit:request.body.unit,
                 price:request.body.price
             }], function(result){
                 console.log(result);
                 response.send({state: true});
             });
         });


         app.post("/productout", function(request, response){
             var data = request.body;
             db.select("product",{
                 $or:[
                 {code:request.body.msg},
                 {name:request.body.msg},
                 {type:request.body.msg},
                 {unit:request.body.msg},
                 {price:request.body.msg},
                 {number:request.body.msg},
                 ]},function(result){
                     console.log(result)
                     response.send(result);
                 });
         });
    }

}