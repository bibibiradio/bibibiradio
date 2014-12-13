//var http=require("http");
var express=require("express");
var bodyParser = require('body-parser');
var app=express();
var path=require("path");

console.log(__dirname);

app.use(bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);

var viewer=require("./views/main")

viewer.initView(app);

app.listen(18877,function(){});