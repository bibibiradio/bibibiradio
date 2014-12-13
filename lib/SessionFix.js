var sessionManager=require("./Session").getSessionManager();
var authManager=require("./Auth").getAuthManager();
var cookieDeal=require("cookie");

var SessionFix={
	"sessionStart":sessionStart,
	"sessionEnd":sessionEnd
};

function getSessionFix(){
	return SessionFix;
}

function sessionStart(req,res,scene){
	var cookiesStr=req.headers["cookie"];
	var cookieDict=null;
	if(cookiesStr!=null&&((cookieDict=cookieDeal.parse(cookiesStr))!=null)&&cookieDict["sessionEncIndex"]!=null){
		var sessionData=sessionManager.getSessionData(cookieDict["sessionEncIndex"]);
		if(sessionData==null){
			return {"sessionData":null,"code":-2};
		}
		var currentRoleIds=authManager.getCurrentRoleIds(sessionData);
		if(!authManager.isAccess(currentRoleIds,scene)){
			console.log("sessionfix scene "+scene);
			return {"sessionData":sessionData,"code":-3};
		}
		return {"sessionData":sessionData,"code":0,"currentRoleIds":currentRoleIds};
	}else{
		return {"sessionData":null,"code":-1};
	}
}

function sessionEnd(req,res,sessionData,type,responseData){
	if(sessionData==null){
		var sessionEncIndex=sessionManager.updateSessionDataWithData(sessionData);
		res.cookie("sessionEncIndex",sessionEncIndex);
	}
	if(type=="send"||type==null){
		res.end(responseData);
	}else if(type=="redirect"){
		res.redirect(responseData);
	}
	
	return;
}

exports.getSessionFix=getSessionFix;