function mysqlQuery(sql_string, callback){
	// send a mysql query and a callback function to get this response
	// the result as a array of objects like [{ result1, result2}]
	// you have only permission to 'SELECT' on database :D

	if(typeof sql_string == "string"){
		var api_host = "http://192.241.152.185/";
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				if(callback != undefined && typeof callback == "function"){
					callback(xhttp.responseText);
				}
			}
		};
		xhttp.open("GET", api_host+sql_string, false);
		xhttp.send();
	}else{
		console.warn("Your query mysql is not a string");
	}
}
