function testSession(){
	var sessionManager=require("../../lib/Session").getSessionManager();

	var sessionData={"abc":123};
	var sessionEnc=sessionManager.createSession(sessionData);

	console.log(sessionManager.getSessionData(sessionEnc));
}

testSession();

