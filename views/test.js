var templateViewer=require("../lib/TemplateViewer").getTemplateViewer();
var frameWork=require("../frameWork/ViewFrameWork");
var authManager=require("../lib/Auth").getAuthManager();
var log4js=require("../lib/LogFactory").log4js;
var env=require("../env").env;

function testDeal(req,res,sessionData,currentRoleIds,logger,sendCallback){
	return sendCallback(req,res,sessionData,"send","");
}

function initTestView(app){
	authManager.installAuthScene("test",["all"]);

	app.get("/test",function(req,res){
		frameWork.webFrameWork(req,res,"test",true,testDeal);
	});
}

exports.initTestView=initTestView;