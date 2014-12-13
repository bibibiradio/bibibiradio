var templateViewer=require("../lib/TemplateViewer").getTemplateViewer();
var frameWork=require("../frameWork/ViewFrameWork");
var authManager=require("../lib/Auth").getAuthManager();
var log4js=require("../lib/LogFactory").log4js;
var env=require("../env").env;

var authManager=require("../lib/Auth").getAuthManager();

function mainPageDeal(req,res,sessionData,currentRoleIds,logger,sendCallback){
	var resData="";
	var content="123";

	resData+=templateViewer.render("./template/layout.ejs",{"title":"主页","content":content,"auth":authManager,"currentRoleIds":currentRoleIds,"request":req,"userName":sessionData["userName"]});

	return sendCallback(req,res,sessionData,"send",resData);
}

function initMainPageView(app){
	authManager.installAuthScene("mainPage",[1,2,7]);

	app.get("/main",function(req,res){
		frameWork.webFrameWork(req,res,"mainPage",true,mainPageDeal);
	});
}

exports.initMainPageView=initMainPageView;