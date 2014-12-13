var mysqlCipherDataBaseConfig={
	"host":"rdsqabyqnqabyqn.mysql.rds.aliyuncs.com",
	"user":"xiaolei",
	"password":"aliyunAa33333586",
	"database":"cipher_manager_database",
	"port":3306
};

var mysqlAuthDataBaseConfig={
	"host":"rdsqabyqnqabyqn.mysql.rds.aliyuncs.com",
	"user":"auth",
	"password":"aliyunAa33333586",
	"database":"auth_user",
	"port":3306
};

function getMysqlCipherDataBaseConfig(){
	return mysqlDataBaseConfig;
}

function getMysqlAuthDataBaseConfig(){
	return mysqlAuthDataBaseConfig;
}

exports.getMysqlCipherDataBaseConfig=getMysqlCipherDataBaseConfig;
exports.getMysqlAuthDataBaseConfig=getMysqlAuthDataBaseConfig;