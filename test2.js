var childProcess = require('child_process'),
free = childProcess.exec('openssl genrsa -out ./clientCert/prikey.pem 2048 && echo -e "cn\\nzhejiang\\nhangzhou\\nbibibiradio\\nxiaolei\\nxiaolei\\nqbjxiaolei@163.com\\n\\n\\n" | openssl req -new -key ./clientCert/prikey.pem -out ./clientCert/prikey.csr');
/*
// 捕获标准输出并将其打印到控制台
free.stdout.on('data', function (data) {
console.log('标准输出：\n' + data);
});

// 捕获标准错误输出并将其打印到控制台
free.stderr.on('data', function (data) {
console.log('标准错误输出：\n' + data);
});
*/

// 注册子进程关闭事件
free.on('exit', function (code, signal) {
console.log('子进程已退出，代码：' + code);
});