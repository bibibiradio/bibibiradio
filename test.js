var templateViewer=require("./lib/TemplateViewer").getTemplateViewer();

var express=require("express");
var app=express();

function responseEnd(response,code,header,responseData){
        response.writeHead(200,{"Content-Type":"text/html"});
        response.end(responseData+"\n");
}

app.get("/",function (request,response){
	responseEnd(response,200,{"Content-Type":"text/html"},templateViewer.render("./template/test.ejs",{"title":"ssl test","content":"aaa","filename":"./template/test.ejs"}));
});

app.listen(18877,function(){});