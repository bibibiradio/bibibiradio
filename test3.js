var certGen=require("./lib/GenerateClientCert").getCertGenerator();

var option={
	"privateKeyPemPath":"./clientCert/xl6.key",
	"keySize":"2048",
	"country":"cn",
	"pron":"zhejiang",
	"city":"hangzhou",
	"org":"bibibiradio",
	"orgUnit":null,
	"commonName":"xl6",
	"email":"361896979@qq.com",
	"csrPath":"./clientCert/xl6.csr",
	"caCert":"./clientCert/ca/ca.crt",
	"caKey":"./clientCert/ca/ca_key.pem",
	"crtOutPath":"./clientCert/xl6.crt",
	"caOpensslCnf":"./clientCert/ca/openssl.cnf",
	"pfxOutPath":"./clientCert/xl6.pfx"
};

certGen.generateCert(option,function(code,signal){});
