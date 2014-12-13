var templateViewer=require("../lib/TemplateViewer").getTemplateViewer();
var sessionFix=require("../lib/SessionFix").getSessionFix();
var pathModule=require("path");

function initStaticView(app){
	app.get("/static/*",function(req,res,next){
		var options = {
		    root: __dirname + '/../static/',
		    dotfiles: 'deny',
		    headers: {
		        'x-timestamp': Date.now(),
		        'x-sent': true
		    }
		};

		var fileName =pathModule.normalize(req.params[0]);
		res.sendFile(fileName, options, function (err) {
		})
	});
}

exports.initStaticView=initStaticView;