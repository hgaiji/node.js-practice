var http = require('http');
//fsモジュールを利用できる状態にする
var fs = require('fs');
var ejs  = require('ejs');
var qs = require('querystring');
var config = require('./config');
var server = http.createServer();
//テンプレートを使うときはreadFileSyncを使う
var template = fs.readFileSync(__dirname + '/hello.ejs','utf-8');
var msg; 
var n = 0;

var posts= [];
//formを表示する
function renderForm(posts, res) {
    var data = ejs.render(template, {
        posts:posts
    });
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write(data);
    res.end();
}
server.on('request',function(req,res) {
    //POSTリクエストだったら
    if (req.method === "POST") {
        req.data="";
        //フォームからのデータ受信
        req.on("readable",function(){
            //nullが来る場合もあるので空文字に
            req.data += req.read() || '';
            console.log(req.data);
        });
        req.on("end",function(){
            var query = qs.parse(req.data);
            console.log(query);
            posts.push(query.user_name);
            renderForm(posts,res);
        });
    }
    else {
        renderForm(posts,res);
    }
});

// サーバを待ち受け状態にする
// 第1引数: ポート番号
// 第2引数: IPアドレス
server.listen(config.port);
console.log(config.port);
