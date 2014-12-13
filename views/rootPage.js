var templateViewer=require("../lib/TemplateViewer").getTemplateViewer();
var sessionFix=require("../lib/SessionFix").getSessionFix();

function initRootView(app){
	app.get("/",function(req,res){
		//do something
		res.redirect("/main");
		//end dosth
	});
}

exports.initRootView=initRootView;