var mysql=require("mysql");
var mysqlConifg=require("./model/Config");

var conn=mysql.createConnection(mysqlConifg.getMysqlAuthDataBaseConfig());

conn.connect();
conn.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
});
conn.end();