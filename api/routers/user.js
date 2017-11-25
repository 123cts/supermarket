var jwt = require('jsonwebtoken');
var apiresult = require('../modules/apiresult');

var db = require('../db/dbhelper');
module.exports = {
    register: function(app){
        app.post('/login', function(req, res){
            db.mongodb.select('user', req.body, function(result){
                if(result.state && result.data.length > 0){
                    var token = jwt.sign({username: req.body.username}, 'abc', {
                        expiresIn: 999
                    })
                    res.send(apiresult(true, {token: token}));
                } else {
                    res.send(apiresult(false, result.data));
                }
            })
        })
    }
}