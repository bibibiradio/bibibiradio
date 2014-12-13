var templateViewer=require("../lib/TemplateViewer").getTemplateViewer();
var sessionFix=require("../lib/SessionFix").getSessionFix();
var sessionManager=require("../lib/Session").getSessionManager();
var cookieDeal=require("cookie");
var authManager=require("../lib/Auth").getAuthManager();

function initForbiddenView(app){
	app.get("/forbidden",function(req,res){
		//do something
		var currentRoleIds=null;
		var cookiesStr=req.headers["cookie"];
		var cookieDict=null;
		if(cookiesStr!=null&&((cookieDict=cookieDeal.parse(cookiesStr))!=null)&&cookieDict["sessionEncIndex"]!=null){
			var sessionData=sessionManager.getSessionData(cookieDict["sessionEncIndex"]);
			if(sessionData==null){
				currentRoleIds=null;
			}else{
				currentRoleIds=authManager.getCurrentRoleIds(sessionData);
			}
		}
		res.send(templateViewer.render("./template/forbidden.ejs",{"title":"bibibiradio forbidden","currentRoleIds":currentRoleIds}));
		res.end();
		//end dosth
	});
}

exports.initForbiddenView=initForbiddenView;