var templateViewer=require("../lib/TemplateViewer").getTemplateViewer();
var sessionManager=require("../lib/Session").getSessionManager();
var authManager=require("../lib/Auth").getAuthManager();
var certGen=require("../lib/GenerateClientCert").getCertGenerator();
var fs=require("fs");
var cookieDeal=require("cookie");
var userModel=require("../model/UserModel").getUserModel();
var secureCore=require("../SecureCore/main");
var csrfTokenDealer=secureCore.csrfTokenDealer;
var saltDealer=secureCore.saltDealer;

var log4js=require("../lib/LogFactory").log4js;
var env=require("../env").env;

var logger=log4js.getLogger(env+"Log");

var loginRolesTable={
	"pwd":[1],
	"cert":[2,7]
}

function setLoginTypeSession(sessionData,loginType,canRoleIds){
	if(sessionData==null||loginType==null){
		return;
	}

	var needRoleIds=loginRolesTable[loginType];

	if(needRoleIds==null){
		return;
	}

	if(canRoleIds!=null){
		authManager.setCanRoleIds(sessionData,canRoleIds);
	}

	authManager.setCurrentRoleIds(sessionData,needRoleIds);
	sessionData["loginType"]=loginType;

	return;
}

function loginLogic(request,response,intoType){
			var cookiesStr=request.headers["cookie"];
			var cookieDict=null;
			logger.debug("/login "+intoType+" phase1");
	        if(cookiesStr!=null&&((cookieDict=cookieDeal.parse(cookiesStr))!=null)&&cookieDict["sessionEncIndex"]!=null){
	        	logger.debug("/login "+intoType+" phase2");
	        	var sessionData=sessionManager.getSessionData(cookieDict["sessionEncIndex"]);
	        	if(sessionData!=null){
		        	var loginType=sessionData["loginType"];
		        	if(loginType="cert"){
		        		logger.debug("/login "+intoType+" phase3");
		        		response.cookie("sessionEncIndex",sessionManager.updateSessionDataWithData(sessionData));
		        		response.redirect("/");
		        		return;
		        	}else if(loginType=="pwd"){
		        		logger.debug("/login "+intoType+" phase4");
		        		if(!authManager.isCertVerify(request.headers["ssl_verified"])){
		        			response.cookie("sessionEncIndex",sessionManager.updateSessionDataWithData(sessionData));
			        		response.redirect("/");
			        		return;
		        		}

		        		logger.debug("/login "+intoType+" phase5");
		        		var clientCertInfo=authManager.getCertInfo(request.headers["ssl_dn"]);
		        		if(clientCertInfo["emailAddress"]!=sessionData["email"]||clientCertInfo["CN"]!=sessionData["userName"]){
		        			response.cookie("sessionEncIndex",sessionManager.updateSessionDataWithData(sessionData));
			        		response.redirect("/");
			        		return;
		        		}

		        		logger.debug("/login "+intoType+" phase6");
		        		csrfTokenDealer.setCsrfTokenToSessionData(sessionData,csrfTokenDealer.generateCsrfToken());
		        		setLoginTypeSession(sessionData,loginType,null);
		        		response.cookie("sessionEncIndex",sessionManager.updateSessionDataWithData(sessionData));
		        		response.redirect("/");
		        		return;
		        	}else{
		        		logger.debug("/login "+intoType+" phase7");
		        		response.cookie("sessionEncIndex",sessionManager.updateSessionDataWithData(sessionData));
			        	response.redirect("/");
			        	return;
		        	}
	        	}
	        }

	        logger.debug("/login "+intoType+" phase8");
	        if(authManager.isCertVerify(request.headers["ssl_verified"])){
	        	logger.debug("/login "+intoType+" phase9");
	        	var clientCertInfo=authManager.getCertInfo(request.headers["ssl_dn"]);
	        	if(clientCertInfo==null||clientCertInfo["emailAddress"]==null){
	        		//假证书
	        		logger.debug("/login "+intoType+" phase10");
	                response.redirect("/forbidden");
	                return;
	        	}

	        	var sessionData={};
	        	sessionData["email"]=clientCertInfo["emailAddress"];
	        	sessionData["userName"]=clientCertInfo["CN"];
	        	logger.debug("/login "+intoType+" phase11");
	        	userModel.getUser(clientCertInfo["emailAddress"],function(err,result){
	        		if(err||result==null){
	        			logger.debug("/login "+intoType+" phase12");
	        			response.redirect("/forbidden");
	                	return;
	        		}

	        		logger.debug("/login "+intoType+" phase13");
	        		if(result["userName"]!=clientCertInfo["CN"]){
	        			response.redirect("/forbidden");
	                	return;
	        		}

	        		logger.debug("/login "+intoType+" phase14");
	        		var canRoleIds=result["canRoles"].split(",");
	        		csrfTokenDealer.setCsrfTokenToSessionData(sessionData,csrfTokenDealer.generateCsrfToken());
	        		setLoginTypeSession(sessionData,"cert",canRoleIds);
	        		response.cookie("sessionEncIndex",sessionManager.updateSessionDataWithData(sessionData));
	        		response.redirect("/");
	        		return;
	       		});
	    		return;
			}

			if(intoType=="loginShow"){
				logger.debug("/login "+intoType+" phase15");
				var resData=templateViewer.render("./template/login.ejs",{"title":"登录","message":null});
				response.send(resData);
				return;
			}else if(intoType=="checkLogin"){
				logger.debug("/login "+intoType+" phase16");
				var email=request.param("email");
				var password=request.param("password");
				var checkCode=request.param("checkCode"); 

				logger.debug("/login "+intoType+" phase17");
				userModel.getUser(email,function(err,result){
					if(err||result==null){
						logger.debug("/login "+intoType+" "+err+" phase18");
	        			response.redirect("/forbidden");
	                	return;
	        		}

	        		logger.debug("/login "+intoType+" phase19");
	        		var salt=result["salt"];
	        		var hashedPassword=result["hashedPassword"];
	        		if(!saltDealer.checkSaltData(hashedPassword,salt,password)){
	        			logger.debug("/login "+intoType+" phase20");
	        			response.send(templateViewer.render("./template/layout.ejs",{"message":"用户名或密码错误"}))
	        			return;
	        		}
	        		logger.debug("/login "+intoType+" phase21");
	        		var canRoleIds=result["canRoles"].split(",");

	        		var sessionData={};
	        		sessionData["email"]=email;
	        		sessionData["userName"]=result["userName"];
	        		csrfTokenDealer.setCsrfTokenToSessionData(sessionData,csrfTokenDealer.generateCsrfToken());
	        		setLoginTypeSession(sessionData,"pwd",canRoleIds);
	        		response.cookie("sessionEncIndex",sessionManager.updateSessionDataWithData(sessionData));
	        		response.redirect("/");
	        		return;
				});

				return;
			}
}

function initLoginView(app){
	app.get("/login",function (request,response){
		loginLogic(request,response,"loginShow");
	});

	app.post("/login",function(request,response){
		loginLogic(request,response,"checkLogin");
		/*
		var commonName=request.param("commonName");
		var email=request.param("email");

		var option={
			"privateKeyPemPath":"./clientCert/"+commonName+".key",
			"keySize":"2048",
			"country":"cn",
			"pron":"zhejiang",
			"city":"hangzhou",
			"org":"bibibiradio",
			"orgUnit":null,
			"commonName":commonName,
			"email":email,
			"csrPath":"./clientCert/"+commonName+".csr",
			"caCert":"./clientCert/ca/ca.crt",
			"caKey":"./clientCert/ca/ca_key.pem",
			"crtOutPath":"./clientCert/"+commonName+".crt",
			"caOpensslCnf":"./clientCert/ca/openssl.cnf",
			"pfxOutPath":"./clientCert/"+commonName+".pfx"
		};

		certGen.generateCert(option,function(code,signal){
			if(fs.existsSync("./clientCert/"+commonName+".pfx")==false){
				response.end();
			}else{
				response.download("./clientCert/"+commonName+".pfx")
			}
		});
		*/

		//response.end();
	});
}

exports.initLoginView=initLoginView;