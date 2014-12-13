function createTestMod(){
	return {
		"isEqualArray":isEqualArray,
		"isEqualDict":isEqualDict,
		"isEqual":isEqual,
		"allNum":0,
		"rightNum":0
	};
}

function isEqualArray(testMod,a,b){
	testMod.allNum++;
	if(a.length!=b.length){
		return false;
	}
	for(var i=0;i<a.length;i++){
		if(a[i]!=b[i]){
			return false;
		}
	}

	testMod.rightNum++;
	return true;
}

function isEqualDict(testMod,a,b){
	testMod.allNum++;
	if(a.length!=b.length){
		return false;
	}

	for(key in a){
		if(a[key]!=b[key]){
			return false;
		}
	}

	testMod.rightNum++;
	return true;
}

function isEqual(testMod,a,b){
	testMod.allNum++;
	if(a.length!=b.length){
		return false;
	}

	if(a!=b){
		return false;
	}

	testMod.rightNum++;
	return true;
}

exports.createTestMod=createTestMod;