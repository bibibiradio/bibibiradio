var templateViewer=require("../lib/TemplateViewer").getTemplateViewer();
var frameWork=require("../frameWork/ViewFrameWork");
var authManager=require("../lib/Auth").getAuthManager();
var log4js=require("../lib/LogFactory").log4js;
var env=require("../env").env;

var userModel=require("../model/UserModel").getUserModel();

function getForgetPasswordDeal(req,res,sessionData,currentRoleIds,logger,sendCallback){
	return sendCallback(req,res,sessionData,"send",templateViewer.render("./template/forgetPassword.ejs",{"message":null}));
}

function postForgetPasswordDeal(req,res,sessionData,currentRoleIds,logger,sendCallback){
	var email=req.param("email");
	var checkPassword=req.param("checkPassword");

	logger.debug("/forgetPassword phase1");
	if(email==null||checkPassword==null){
		logger.debug("/forgetPassword phase2");
		return sendCallback(req,res,sessionData,"send",templateViewer.render("./template/forgetPassword.ejs",{"message":"邮箱或验证码错误"}));
	}

	userModel.getUser(email,function(err,result){
		if(err||result==null){
			logger.debug("/forgetPassword phase3");
			return sendCallback(req,res,sessionData,"send",templateViewer.render("./template/forgetPassword.ejs",{"message":"邮箱或验证码错误"}));
		}

		//send email to emailAddress
		logger.debug("/forgetPassword phase4");
		//end
	});
}

function getCheckForgetPassword(req,res,sessionData,currentRoleIds,logger,sendCallback){
	
}

function initForgetPasswordView(app){

	app.get("/forgetPassword",function(req,res){
		frameWork.webFrameWork(req,res,"forgetPassword",false,getForgetPasswordDeal);
	});

	app.post("/forgetPassword",function(req,res){
		frameWork.webFrameWork(req,res,"forgetPassword",false,getForgetPasswordDeal);
	});

	app.post("/checkForgetPassword",function(req,res){
		frameWork.webFrameWork(req,res,"forgetPassword",false,getForgetPasswordDeal);
	});
}

exports.initForgetPasswordView=initForgetPasswordView;