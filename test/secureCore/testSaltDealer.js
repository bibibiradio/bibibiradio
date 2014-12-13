var saltDealer=require("../../SecureCore/SaltDealer").getSaltDealer();

function testSaltDealer(){
	var salt1=saltDealer.generateSalt();
	var salt2=saltDealer.generateSalt();

	console.log(salt1);
	console.log(salt2);

	var data1="123";
	var data2="456";

	var saltData1=saltDealer.generateSaltData(salt1,data1);
	var saltData2=saltDealer.generateSaltData(salt2,data2);

	console.log(saltData1);
	console.log(saltData2);

	console.log(saltDealer.checkSaltData(saltData1,salt1,data1));
	console.log(saltDealer.checkSaltData(saltData2,salt2,data2));
	console.log(saltDealer.checkSaltData(saltData1,salt2,data1));
	console.log(saltDealer.checkSaltData(saltData2,salt1,data1));
}

testSaltDealer();