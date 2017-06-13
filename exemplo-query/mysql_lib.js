function mysqlQuery(sql_string, callback){
	// send a mysql query and a callback function to get this response
	// the result as a array of objects like [{ result1, result2}]
	// you have only permission to 'SELECT' on database :D

	if(typeof sql_string == "string"){
		var api_host = "http://192.241.152.185/";		
		$.ajax({
			url: api_host+encodeURIComponent(sql_string)
		}).done(function(result) {
			if(callback != undefined && typeof callback == "function"){
				callback(result);
			}
		});
	}else{
		console.warn("Your query mysql is not a string");
	}
}
