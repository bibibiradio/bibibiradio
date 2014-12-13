var regModel=require("./RegModel").getRegModel();
var userModel=require("./UserModel").getUserModel();

function test1(){
	regModel.regUser("qbjxiaolei@163.com","xiaolei","123456",7,"this is admin",function(err,results){
		if(err){
			console.log("insert admin fail");
		}
	});
}

function test2(){
	regModel.isExistEmail("qbjxiaolei@163.com",function(err,count){
		console.log("r1:"+count);
	});

	regModel.isExistEmail("qbjxiaol33@163.com",function(err,count){
		console.log("r2:"+count);
	});

	regModel.isExistUserName("xiaolei",function(err,count){
		console.log("r3:"+count)
	});

	regModel.isExistUserName("xiaol33",function(err,count){
		console.log("r4:"+count)
	});

	userModel.getUser("qbjxiaolei@163.com",function(err,result){
		if(result==null){
			console.log("r5:null");
			return;
		}

		console.log("r5:"+result)
	});
	//console.log("r5:"+r5);

	userModel.getUser("qbjxiaol33@163.com",function(err,result){
		if(result==null){
			console.log("r6:null");
			return;
		}

		console.log("r6:"+result)
	});
	//console.log("r6:"+r6);
}

//test1();
test2();