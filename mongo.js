var MongoClient = require('mongodb').MongoClient,
    settings = require('./config');
MongoClient.connect("mongodb://localhost/"+settings.db,function(err,client){
    if(err) {
        return console.dir(err);
    }

    console.log("connected to db");
    const db = client.db('nodedb');
    db.collection("users",function(err,collection) {
        var docs =[
            {name: "taguchi",score:80},
            {name: "uchi",score:40},
            {name: "guchi",score:60},
        ];
        collection.find().toArray(function(err,items) {
            console.log(items);
        })
    });
});