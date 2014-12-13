function passwordCheck(password){
	if(password.length<6){
		return false;
	}

	return true;
}

exports.passwordCheck=passwordCheck;