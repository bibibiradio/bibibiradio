var mysql=require("mysql");
var mysqlConfig=require("./Config");
var logger=require("log4js");

var sqlTemplate={
	"getUser":"select uid,email,salt_password,user_password,user_name,can_roles,personal_comment,create_time from user_info where email=?"
};

var userModel={
	"getUser":getUser
};

function getUserModel(){
	return userModel;
}
//功能代码

function getUser(email,callback){
	var conn=mysql.createConnection(mysqlConfig.getMysqlAuthDataBaseConfig());
	var getUserSql=sqlTemplate["getUser"];

	var sqlQuery=null;

	sqlQuery=conn.query(getUserSql,[email],function(err,results){
		if(err){
			callback(err,null);
			return;
		}

		if(results.length<=0){
			callback(err,null);
			return;
		}

		//console.log(results);

		var result={
			"uid":results[0].uid,
			"email":results[0].email,
			"salt":results[0].salt_password,
			"hashedPassword":results[0].user_password,
			"userName":results[0].user_name,
			"canRoles":results[0].can_roles,
			"personalComment":results[0].personal_comment,
			"createTime":results[0].create_time
		};

		callback(err,result);
	});
	//console.log(sqlQuery.sql);
	conn.end();
}

//功能代码

exports.getUserModel=getUserModel;