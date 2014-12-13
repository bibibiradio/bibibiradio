function authTest(){
	var authManager=require("../../lib/Auth").getAuthManager();

	authManager.installAuthScene("test1",[3,4,5]);
	authManager.installAuthScene("test2",[1,7]);
	authManager.installAuthScene("test3",[4,7]);
	authManager.installAuthScene("test4",[1,2,7]);

	console.log(authManager.priTable);

	sessionData1={};

	authManager.setCanRoleIds(sessionData1,[3,4,5]);
	authManager.setCurrentRoleIds(sessionData1,[1,3,4]);
	console.log(sessionData1);

	console.log(authManager.isAccess(authManager.getCurrentRoleIds(sessionData1),"test1"));
	console.log(authManager.isAccess(authManager.getCurrentRoleIds(sessionData1),"test2"));
	console.log(authManager.isAccess(authManager.getCurrentRoleIds(sessionData1),"test3"));
	console.log(authManager.isAccess(["2"],"test4"));
}

authTest();