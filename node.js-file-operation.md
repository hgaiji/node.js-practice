# Node.js 文法
## ファイル操作
 Node.jsでファイル操作を行うには**fsモジュール**を使う！
<dl>
    <dt><u>fsモジュールとは</u></dt>
    <dd>Node.jsでファイルを操作するための公式モジュール</dd>
</dl>

### fsモジュールの使い方
ファイルの読み込み方法  
1. <font color="red">`require()`</font>を使って**fsモジュール**を利用できる状態に
    ```javascript
    var fs = require('fs');
    ```
    以降は「**fs**」を使ってファイル操作のメソッドが使える
2. <font color="red">「**readFile**」</font>メソッドを使ってファイルを読み込む
    ```javascript
    //fs.readFile(ファイルパス,文字コード,コールバック関数);
    fs.readFile('sample.html','utf-8',function(err,data){
        console.log(data)
    });
    ```
    - 第一引数：ファイルのパスを文字列
    - 第二引数：utf8」などの文字コード
    - 第三引数：ファイルを読み込んだあとに実行したい関数
        - <font color="red">「**err（エラー情報）**」</font>
            - <font color="green">「**if文**」</font>などを用いてファイルが読み込めなかった時の処理をかく
        - <font color="red">「**data（ファイルの中身）**」
        </font>
            - 上記では、<font color ="red">「**data**」</font>に「**text.txt**」の中身が入っている

## 「readFile」と「readFileSync」の違い
<font color="red">「**同期処理**」</font>か<font color="red">「**非同期処理**」</font>かの違い  
- readFile = <font color="red">「**同期処理**」</font>
- readFileSync = <font color="red">「**非同期処理**」</font>
    - <font color="red">**ファイルを読み込んでいる間も処理が止まらず別の作業を行うことができる**</font>  
