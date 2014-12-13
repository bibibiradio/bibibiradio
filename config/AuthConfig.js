var roleName2roleIdHash={
	"notLogin":-1,
	"test":0,
	"goodUser":1,
	"normalUser":2,
	"creator":7
};

var roleIdMatchAuthHash={
	"-1":{"test":true},
	"0":{"test":true},
	"1":{"test":true,"keyManager":true,"account":true,"mainPage":true},
	"2":{"test":true,"mainPage":true},
	"3":{"all":true}
};

exports.roleName2roleIdHashConfig=roleName2roleIdHash;
exports.roleIdMatchAuthHashConfig=roleIdMatchAuthHash;