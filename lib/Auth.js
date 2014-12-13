var Auth={
	"setCurrentRoleIds":setCurrentRoleIds,
	"setCanRoleIds":setCanRoleIds,
	"getCurrentRoleIds":getCurrentRoleIds,
	"getCanRoleIds":getCanRoleIds,
	"getCertInfo":getCertInfo,
	"isCertVerify":isCertVerify,
	"isAccess":isAccess,
	"installAuthScene":installAuthScene,
	"priTable":null
};

function getAuthManager(){
	return Auth;
}

function installAuthScene(scene,accessRoleIds){
	if(scene==null||accessRoleIds==null){
		return false;
	}

	if(Auth.priTable==null){
		Auth.priTable={};
	}

	Auth.priTable[scene]={};

	for(var i=0;i<accessRoleIds.length;i++){
		Auth.priTable[scene][accessRoleIds[i]]=true;
	}

	return true;
}

function setCurrentRoleIds(sessionData,loginRoleIds){
	if(sessionData==null||sessionData["canRoleIds"]==null){
		return false;
	}

	var currentRoleIds=[];
	var canRoleIds=sessionData["canRoleIds"];
	for(var i=0;i<loginRoleIds.length;i++){
		if(canRoleIds[loginRoleIds[i]]==1){
			currentRoleIds.push(loginRoleIds[i]);
		}
	}

	sessionData["currentRoleIds"]=currentRoleIds;

	return true;
}

function setCanRoleIds(sessionData,roleIds){
	if(sessionData==null){
		return false;
	}

	var canRoleIds={};
	for(var i=0;i<roleIds.length;i++){
		canRoleIds[roleIds[i]]=1;
	}

	sessionData["canRoleIds"]=canRoleIds;

	return true;
}

function getCurrentRoleIds(sessionData){
	if(sessionData==null||sessionData["currentRoleIds"]==null){
		return null;
	}

	return sessionData["currentRoleIds"];
}

function getCanRoleIds(sessionData){
	if(sessionData==null||sessionData["canRoleIds"]==null){
		return null;
	}

	return sessionData["canRoleIds"];
}

function getCertInfo(subjectString){
	if(subjectString==null){
		return null;
	}
	var certInfo={};
	var splitSubjects=subjectString.split("/");
	if(splitSubjects.length<=0){
		return null;
	}
	for(var i=0;i<splitSubjects.length;i++){
		if(splitSubjects[i].length==0){
			continue;
		}
		var keyValue=splitSubjects[i].split("=");
		if(keyValue.length!=2){
			continue;
		}
		certInfo[keyValue[0]]=keyValue[1];
	}
	if(certInfo.length==0){
		return null;
	}
	return certInfo;
}

function isCertVerify(verifySign){
	if(verifySign=="NONE"){
		return false;
	}

	return true;
}

function isAccess(currentRoleIds,currentPriScene){
	if(currentRoleIds==null||currentPriScene==null){
		return false;
	}
	var priTable=Auth.priTable;

	if(priTable==null){
		return false;
	}

	var scenePri=priTable[currentPriScene];
	if(scenePri==null){
		return false;
	}

	if(scenePri["all"]==true){
		return true;
	}

	for(var i=0;i<currentRoleIds.length;i++){
		var currentRoleId=currentRoleIds[i];
		if(scenePri[currentRoleId]==true){
			return true;
		}
	}

	return false;
}

exports.Auth=Auth;
exports.getAuthManager=getAuthManager;