var crypto=require("crypto");

var Session={
	"createSession":createSession,
	"getSessionData":getSessionData,
	"setSessionData":setSessionData,
	"updateSessionData":updateSessionData,
	"updateSessionDataWithData":updateSessionDataWithData,
	"sessionExpire":900000,
	"aesPassword":"xiaolei.xl1304",
	"cryptoAlg":"aes-128-cbc"
};

function getSessionManager(){
	return Session;
}

function encData(cryptoAlg,data,key){
	var cipher=crypto.createCipher(cryptoAlg,key);
	var crypted=cipher.update(data,"binary","hex");
	crypted+=cipher.final("hex");
	return crypted;
}

function decData(cryptoAlg,data,key){
	var decipher=crypto.createDecipher(cryptoAlg,key);
	var dec=decipher.update(data,"hex","binary");
	dec+=decipher.final("binary");
	return dec;
}

function createSession(sessionData){
	try{
		var jsonString=JSON.stringify({"sessionData":sessionData,"timestamp":Date.parse(new Date())});
		return encData(Session.cryptoAlg,jsonString,Session.aesPassword);
	}catch(e){
		return null;
	}
}

function getSessionData(sessionEncIndex){
	try{
		var jsonString=decData(Session.cryptoAlg,sessionEncIndex,Session.aesPassword);
		var sessionObj=JSON.parse(jsonString);
		var sessionTime=sessionObj.timestamp;
		if(Date.parse(new Date())-sessionTime>=Session.sessionExpire){
			return null;
		}
		return sessionObj.sessionData;
	}catch(e){
		return null;
	}
}

function setSessionData(sessionData){
	return createSession(sessionData);
}

function updateSessionData(sessionEncIndex){
	try{
		var jsonString=decData(Session.cryptoAlg,sessionEncIndex,Session.aesPassword);
		var sessionObj=JSON.parse(jsonString);
		sessionObj["timestamp"]=Date.parse(new Date());
		return encData(Session.cryptoAlg,JSON.stringify(sessionObj),Session.aesPassword);
	}catch(e){
		return null;
	}
}

function updateSessionDataWithData(sessionData){
	return createSession(sessionData);
}

exports.Session=Session;
exports.getSessionManager=getSessionManager;