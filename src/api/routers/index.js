var express = require('express');
var app = express();
var path = require('path');
var bp = require('body-parser');

app.use(bp.urlencoded({extended: false}));

//用户
var user = require('./user');
//产品
var product = require('./product');
//引入模块....


app.use(express.static(path.join(__dirname, '../../web/')));

module.exports = {
		start: function(_port){

             app.use(bp.urlencoded({extended: false}));

            //跨域
            app.all('*', function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
                res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
                res.header("X-Powered-By",' 3.2.1')
                if(req.method=="OPTIONS") {
                    res.sendStatus(200);/*让options请求快速返回*/
                } else{
                    next();
                }
            });

			user.register(app);
			
			// product.register(app);

			app.listen(_port);
		}
}