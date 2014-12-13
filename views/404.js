var templateViewer=require("../lib/TemplateViewer").getTemplateViewer();
var sessionFix=require("../lib/SessionFix").getSessionFix();

function init404View(app){
	app.get("*",function(req,res){
		//do something
		res.status(404).send(templateViewer.render("./template/404.ejs",{"title":"bibibiradio not found"}));
		res.end();
		//end dosth
	});
}

exports.init404View=init404View;