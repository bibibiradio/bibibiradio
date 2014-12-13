var cmdInjectProtector={
	"inputCheck":inputCheck,
	"cmdBlack":"\""
};

function getCmdInjectProtector(){
	return cmdInjectProtector;
}

function inputCheck(cmdInputString){
	for(var i=0;i<cmdInputString.length;i++){
		for(var j=0;j<cmdInjectProtector.cmdBlack.length;j++){
			if(cmdInputString[i]==cmdInjectProtector.cmdBlack[j]){
				return false;
			}
		}
	}
	return true;
}

exports.getCmdInjectProtector=getCmdInjectProtector;
exports.inputCheck=inputCheck;