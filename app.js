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
<<<<<<< HEAD
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
     
=======
    userGroup=new Array(),
    userGroupSort=0,
    shakeResult=new Array(),
    scoreList=0;

//监测持续连接
io.on('connection', function(socket,res){

    //设置用户id，并向client推送用户id
    socket.on('checkUser',function(msg){
        userId++;

        //判断用户是否满了
        if (userGroup.length<2){
            userGroup[userGroupSort]=userId;
            userGroupSort++;
            console.log('用户组'+ userGroup)
            io.emit('setUser',{ userNum: userId });
            //当两个用户都进入后,向client推送执行showgame event
            if(userGroup.length==2){
                io.emit('showGame');
            }
        }else{
            //房间满后，向client推送roomFull事件
            io.emit('roomFull');
        };

    })

    //手机摇一摇后服务端生成随机数，处理后返回结果
     socket.on('shakePhone',function(data){
        var urNum = Math.floor(Math.random() * 3 + 1);
        console.log(urNum)
        var arr={
            "name":data,
            "score":urNum,
        }
        scoreList++
        shakeResult.push(arr);
        //摇一摇所有用户完成后，返回结果
        if(shakeResult.length==2){
            console.log(shakeResult);
            ComResult(shakeResult);
            io.emit('backResult',shakeResult)
        }
     })

     //处理摇一摇结果
     function ComResult(data){
        if(data[0].score==data[1].score){
            //数值相等
            for(var i=0;i<data.length;i++){
                data[i]['result']='equal'
            }
        }else{
            var compareScore=data[0].score-data[1].score;
            //非全等时
            if(compareScore>0){
                if(compareScore==1){
                    data[0]['result']='win';
                    data[1]['result']='lose';
                }else{
                    data[0]['result']='lose';
                    data[1]['result']='win';
                }

            }else{
                compareScore=compareScore*-1;
                if(compareScore==1){
                    data[0]['result']='lose';
                    data[1]['result']='win';
                }else{
                    data[0]['result']='win';
                    data[1]['result']='lose';
                }
            }

        }
     }



     //再来一局，清除用户序列，清除之前的结果
     socket.on('gameAgain',function(){
        userGroup.splice(0,userGroup.length);
        shakeResult.splice(0,shakeResult.length);
        io.emit('rePlay');

     })

>>>>>>> Dev

});

// 终端打印如下信息
http.listen(3000, function(){
    console.log('listening on :3000');
});