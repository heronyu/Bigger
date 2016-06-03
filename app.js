var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.engine('.html',require('ejs').__express);
app.use(express.static(__dirname + '/public'));
app.set('views',__dirname+'/views');
app.set('view engine','html');



app.get('/', function(req, res){
    res.render('index')
});

//监听websocket链接的通讯
//增加用户
var userId=0,
    userGroup;
io.on('connection', function(socket,res){
    //递增用户数量
    userId++;
    userGroup={};
    //发送用户user id
    socket.emit('setUser', { name:userId });
    socket.on('checkUser', function(msg){

        io.emit('checkUser', msg);
          });
     

});

// 终端打印如下信息
http.listen(3000, function(){
    console.log('listening on :3000');
});