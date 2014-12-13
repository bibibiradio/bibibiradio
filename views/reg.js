var secureCore=require("../SecureCore/main");

var templateViewer=require("../lib/TemplateViewer").getTemplateViewer();
var sessionFix=require("../lib/SessionFix").getSessionFix();
var sessionManager=require("../lib/Session").getSessionManager();
var csrfTokenDealer=secureCore.csrfTokenDealer;
var inputChecker=secureCore.cmdInjectProtector;
var passwordSecureStrenthChecker=secureCore.passwordSecureStrenthChecker;
var saltDealer=secureCore.saltDealer;
var dbModel=require("../model/Model");
var crypto=require("crypto");

var log4js=require("../lib/LogFactory").log4js;
var env=require("../env").env;

function initRegView(app){
	var logger=log4js.getLogger(env+"Log");

	app.get("/reg",function(req,res){
		//check csrf token phase
		//
		var resData="";
		//do something
		res.send(templateViewer.render("./template/reg.ejs",{"invalids":{}}));
		//end dosth
	});

	app.post("/reg",function(req,res){
		var email=req.param("email");
		var userName=req.param("userName");
		var password=req.param("password");
		var checkPassword=req.param("checkPassword");
		//var checkCode=req.param("checkCode");
		if(password!=checkPassword){
			var msg="密码与验证密码不一致";
			res.send(templateViewer.render("./template/reg.ejs",{"invalids":{"invalidPassword":msg}}));
			return;
		}

		if(!passwordSecureStrenthChecker.passwordCheck(password)){
			var msg="密码强度太弱";
			res.send(templateViewer.render("./template/reg.ejs",{"invalids":{"invalidPassword":msg}}));
			return;
		}

		if(!inputChecker.inputCheck(email)){
			var msg="邮箱格式错误";
			res.send(templateViewer.render("./template/reg.ejs",{"invalids":{"invalidEmail":msg}}));
			return;
		}

		if(!inputChecker.inputCheck(userName)){
			var msg="用户名格式错误";
			res.send(templateViewer.render("./template/reg.ejs",{"invalids":{"invalidUserName":msg}}));
			return;
		}

		logger.debug("/reg phase1");

		dbModel.regModel.isExistEmail(email,function(err,count){
			if(err||count==-1||count>0){
				//重新渲染
				var msg="邮箱已注册";
				logger.debug("/reg phase2");
				logger.debug("/reg "+err);
				res.send(templateViewer.render("./template/reg.ejs",{"invalids":{"invalidEmail":msg}}));
				res.end();
				return;
				//end
			}

			logger.debug("/reg phase3");

			dbModel.regModel.isExistUserName(userName,function(err,count){
				if(err||count==-1||count>0){
					//重新渲染
					logger.debug("/reg phase4");
					var msg="用户名已注册";
					res.send(templateViewer.render("./template/reg.ejs",{"invalids":{"invalidUserName":msg}}));
					res.end();
					return;
					//end
				}

				var salt=saltDealer.generateSalt();
				var saltPasswordHash=saltDealer.generateSaltData(salt,password);

				dbModel.regModel.regUser(email,userName,salt,saltPasswordHash,[1,2,3,4,5,6],"",function(err,result){
					if(err){
						logger.debug("/reg phase5");
						var msg="inner error";
						res.status(500).send("500");
						res.end();
						return;
					}

					//跳转
					logger.debug("/reg phase6");
					res.redirect("/login");
					res.end();
					//end
				});
			});
		});
	});

}

exports.initRegView=initRegView;