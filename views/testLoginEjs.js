var templateViewer=require("../lib/TemplateViewer").getTemplateViewer();
var sessionFix=require("../lib/SessionFix").getSessionFix();
var sessionManager=require("../lib/Session").getSessionManager();
var csrfTokenDealer=require("../SecureCore/main").csrfTokenDealer;

function initTestLoginEjsView(app){
	app.get("/testLoginEjs",function(req,res){
		//check csrf token phase
		//
		var resData="";
		//do something
		res.send(templateViewer.render("./template/login.ejs",{}));
		//end dosth
	});
}

exports.initTestLoginEjsView=initTestLoginEjsView;