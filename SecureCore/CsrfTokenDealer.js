var crypto=require("crypto");

function generateCsrfToken(){
	var sha256Hash=crypto.createHash("sha256");
	randomNum=new Number(Math.random() * 1000000000000000000000).toFixed(0);
	sha256Hash.update(randomNum);
	return sha256Hash.digest("hex");
}

function getCsrfTokenInSessionData(sessionData){
	return sessionData["csrfToken"];
}

function setCsrfTokenToSessionData(sessionData,csrfToken){
	sessionData["csrfToken"]=csrfToken;
}

function getCsrfTokenHtmlInForm(csrfToken){
	return "<input type=\"hidden\" name=\"csrfToken\" value=\""+csrfToken+"/>"
}

function isHaveCsrfTokenInSessionData(sessionData){
	if(sessionData["csrfToken"]!=null){
		return true;
	}

	return false;
}

function checkCsrfToken(req,sessionData){
	if(req.params["csrfToken"]==null || sessionData["csrfToken"]==null){
		return false;
	}
	if(req.params["csrfToken"]==sessionData["csrfToken"]){
		return true;
	}

	return false;
}

exports.generateCsrfToken=generateCsrfToken;
exports.getCsrfTokenInSessionData=getCsrfTokenInSessionData;
exports.setCsrfTokenToSessionData=setCsrfTokenToSessionData;
exports.getCsrfTokenHtmlInForm=getCsrfTokenHtmlInForm;
exports.isHaveCsrfTokenInSessionData=isHaveCsrfTokenInSessionData;
exports.checkCsrfToken=checkCsrfToken;
