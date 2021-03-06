# node.js
![node.js](node.png "サンプル")
## サーバの仕組み
**スレッドモデルとイベントループ**    
* 大量のリクエストをさばくための処理形式
### スレッドモデル
Requestに対し、Thereadを立ち上げて対応  
大量にくると、Request処理待ちが発生する
- Apache等で使われている
    - 世界中で使用されているWebサーバーソフトウェア(HTTPサーバー)
- 基本的に1リクエストに対して、1スレッドで処理を対応する
![thread](model/thread.jpg "サンプル")
- スレッドはメモリを消費するため、瞬時的に大量のリクエストがくると多くのスレッドが立ち上がる
- スレッドが多く立ち上げるとメモリが足りなくなるので待ちリクエストが発生
### イベントループモデル
- QueueでEventLoopでまわす（メインスレッド）  
    - Requestを貯めることができる
- I/O(バックグラウンドスレッド)
    - バックグラウンドでリクエストを処理

    **メリット**  
    - 前の処理を終わるまで待つ必要がない    

    **デメリット**  
    - 処理の終了順番がわからない  　  　
    - ループをブロックしないプログラミングが必要　　
        - イベントをブロックしてしまうと、実際待ちが発生

![event](model/event.jpg "サンプル")

## 記述方法
1. ブロッキング
    ```
    //ブロッキングな書き方
    var start = new Date().getTime();

    while(new Date().getTime() < start + 1000){
                //1秒待つ
    }

    console.log('world');
    ```
    whileの処理（1秒間）の後に`world`を表示する
2. ノンブロッキング
    ```
    //ノンブロッキングな書き方
    //callback関数
    setTimeout(function(){
        console.log('hello');
    },1000);

    console.log('world');
    ```
    **実行結果**
    ```
    $ node hello.js
    world
    hello
    ```
    **処理がかかりそうな処理はcallback関数を使用して処理する**

## Webサーバーの作成
### ファイル分割（exports）
node.jsではデフォルトで`exports`という機能がある   

**使い方**    
    1.よく使う(外部ファイル)変数を`exports.{変数名} = xxx`と定義  
    2.呼び出す元で、`var hoge = require('./xxxx')`  
    3.`hoge.{変数名}`で外部ファイルの値を使う

```javascript:config.js
exports.port = 3000;

```
sever.js(呼び出し元)から使用
```javascript:server.js
var http = require('http');
var config = require('./config');
var server = http.createServer();

server.on('request',function(req,res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.write('hello world');
    res.end();
});

// サーバを待ち受け状態にする
// 第1引数: ポート番号
// 第2引数: IPアドレス
server.listen(config.port);
console.log(config.port);
```

### プロセス終了方法
1. ctrl + c

2.  

- ps aux | grep node
- kill -9 <PROCESS_ID>

3. killall node

## リクエストのURL毎に処理を分割
```javascript:server.js
(省略)
//変更点のみ記述
res.write('request from: ' + req.url);
(省略)
```
**実行結果**

![requestURL](requestURL.png "サンプル")
![requestURL2](requestURL2.png "サンプル")  
上記のようにリクエストURLが取れている