var templateViewer=require("../lib/TemplateViewer").getTemplateViewer();
var sessionFix=require("../lib/SessionFix").getSessionFix();
var sessionManager=require("../lib/Session").getSessionManager();
var csrfTokenDealer=require("../SecureCore/main").csrfTokenDealer;
var log4js=require("../lib/LogFactory").log4js;
var env=require("../env").env;

function webFrameWork(req,res,scene,needLogin,viewFunction){
	var logger=log4js.getLogger(env+"Log");

	var sessionData=null;
	var currentRoleIds=null;

	if(needLogin){
		//console.log("webFrameWork "+scene);
		var retSessionRef=sessionFix.sessionStart(req,res,scene);
		if(retSessionRef["code"]==-1 || retSessionRef["code"]==-2){
			//未登录或者登录过期
			res.redirect("/login");
			res.end();
			return;
		}else if(retSessionRef["code"]<-2){
			//权限不够
			logger.debug("code < -2 and code = "+retSessionRef["code"]);
			res.redirect("/forbidden");
			res.end();
			return;
		}
		var sessionData=retSessionRef["sessionData"];
		var currentRoleIds=retSessionRef["currentRoleIds"];
		if(!csrfTokenDealer.isHaveCsrfTokenInSessionData(sessionData)){
			csrfTokenDealer.setCsrfTokenToSessionData(sessionData,csrfTokenDealer.generateCsrfToken());
			res.cookie("sessionEncIndex",sessionManager.createSession(sessionData));
			res.redirect("/login");
			res.end();
			return;
		}
	}

	//check csrf token phase
	//

	//do something
	viewFunction(req,res,sessionData,currentRoleIds,logger,sessionFix.sessionEnd);
	//end dosth
}

exports.webFrameWork=webFrameWork;