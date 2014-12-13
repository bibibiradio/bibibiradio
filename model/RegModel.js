var mysql=require("mysql");
var mysqlConfig=require("./Config");
var logger=require("log4js");
var log4js=require("../lib/LogFactory").log4js;
var env=require("../env").env;

var logger=log4js.getLogger(env+"Log");

var sqlTemplate={
	"regUser":"insert into user_info (email,user_name,salt_password,user_password,can_roles,personal_comment,create_time) values (?,?,?,?,?,?,?);",
	"tryIsExistEmail":"select count(*) as email_count from user_info where email=?",
	"tryIsExistUserName":"select count(*) as username_count from user_info where user_name=?"
};

var regModel={
	"regUser":regUser,
	"isExistEmail":isExistEmail,
	"isExistUserName":isExistUserName
};

function getRegModel(){
	return regModel;
}
//功能代码

function regUser(email,userName,saltPassword,hashedPassword,can_roles,personalComment,callback){
	/*
	if(salt==null){
		var sha256Hash=crypto.createHash("sha256");
		sha256Hash.update(rawSalt);
		salt=sha256Hash.digest("hex");
	}

	var saltPassword=salt+password+salt;
	var sha256Hash=crypto.createHash("sha256");
	sha256Hash.update(saltPassword);
	var saltPasswordHash=sha256Hash.digest("hex");
	*/

	var conn=mysql.createConnection(mysqlConfig.getMysqlAuthDataBaseConfig());
	var regUserSqlTemplate=sqlTemplate["regUser"];
	var maxUidSqlTemplate=sqlTemplate["updateMaxUid"];

	conn.query(regUserSqlTemplate,[email,userName,saltPassword,hashedPassword,can_roles.join(","),personalComment,new Date()],function(err,results){
		if(err){
			callback(err,results);
			return;
		}

		callback(err,results);
	});
	conn.end();
}

function isExistEmail(email,callback){
	var conn=mysql.createConnection(mysqlConfig.getMysqlAuthDataBaseConfig());
	var isExistEmailSql=sqlTemplate["tryIsExistEmail"];

	conn.query(isExistEmailSql,[email],function(err,results){
		if(err){
			callback(err,-1);
			return;
		}

		callback(err,results[0].email_count);
	});
	conn.end();
}

function isExistUserName(userName,callback){
	var conn=mysql.createConnection(mysqlConfig.getMysqlAuthDataBaseConfig());
	var isExistUserNameSql=sqlTemplate["tryIsExistUserName"];
	conn.query(isExistUserNameSql,[userName],function(err,results){
		if(err){
			callback(err,-1);
			return;
		}

		callback(err,results[0].username_count);
	});
	conn.end();
}

//功能代码

exports.getRegModel=getRegModel;