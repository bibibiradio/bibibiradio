var childProcess = require('child_process');
var ejs=require("ejs");

//free = childProcess.exec('openssl genrsa -out ./clientCert/prikey.pem 2048 && echo -e "cn\\nzhejiang\\nhangzhou\\nbibibiradio\\nxiaolei\\nxiaolei\\nqbjxiaolei@163.com\\n\\n\\n" | openssl req -new -key ./clientCert/prikey.pem -out ./clientCert/prikey.csr');

var CertGenerator={
	"generateCert":generateCert,
	"templateString":"openssl genrsa -out \"<%- privateKeyPemPath %>\" \"<%- keySize %>\" && echo -e \"<%- country %>\\n<%- pron %>\\n<%- city %>\\n<%- org %>\\n<%- orgUnit %>\\n<%- commonName %>\\n<%- email %>\\n\\n\\n\" | openssl req -new -key \"<%- privateKeyPemPath %>\" -out \"<%- csrPath %>\" && echo -e \"y\\ny\\n\" | openssl ca -cert \"<%- caCert %>\" -keyfile \"<%- caKey %>\" -in \"<%- csrPath %>\" -out \"<%- crtOutPath %>\" -config \"<%- caOpensslCnf %>\" && echo -e \"\\n\\n\\n\\n\" | openssl pkcs12 -export -inkey \"<%- privateKeyPemPath %>\" -in \"<%- crtOutPath %>\" -out \"<%- pfxOutPath %>\" -password pass:"
};

function getCertGenerator(){
	return CertGenerator;
}

function generateCert(option,callback){
	var cmd=ejs.render(CertGenerator.templateString,option);

	//console.log(cmd);

	var chProcess=childProcess.exec(cmd);
	/*
	// 捕获标准输出并将其打印到控制台
	chProcess.stdout.on('data', function (data) {
		console.log('标准输出：\n' + data);
	});

	// 捕获标准错误输出并将其打印到控制台
	chProcess.stderr.on('data', function (data) {
		console.log('标准错误输出：\n' + data);
	});

	*/
	// 注册子进程关闭事件
	chProcess.on('exit',callback);// function (code, signal) {
	//	console.log('子进程已退出，代码：' + code);
	//});
	
	return true;
}

exports.getCertGenerator=getCertGenerator;