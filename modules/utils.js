var utils = {

	ellipsesPrefix(str, maxChars){
		if(str.length > maxChars){
			str = str.slice(str.length - maxChars, str.length);
			str = '...' + str;
		}
		return str;
	}

};

module.exports = utils;