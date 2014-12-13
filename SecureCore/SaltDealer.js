var crypto=require("crypto");

var saltDealer={
	"generateSalt":generateSalt,
	"generateSaltData":generateSaltData,
	"checkSaltData":checkSaltData
};

function getSaltDealer(){
	return saltDealer;
}

function generateSalt(){
	var saltRoot=""+Date.parse(new Date())+Math.random()*10000;
	var sha256Hash=crypto.createHash("sha256");
	sha256Hash.update(saltRoot);
	return sha256Hash.digest("hex");
}

function generateSaltData(salt,data){
	var saltData=salt+data+salt;
	var sha256Hash=crypto.createHash("sha256");
	sha256Hash.update(saltData);
	return sha256Hash.digest("hex");
}

function checkSaltData(saltData,salt,data){
	var saltDataTest=salt+data+salt;
	var sha256Hash=crypto.createHash("sha256");
	sha256Hash.update(saltDataTest);
	var checkSaltData=sha256Hash.digest("hex");

	if(saltData==checkSaltData){
		return true;
	}

	return false;
}

exports.getSaltDealer=getSaltDealer;