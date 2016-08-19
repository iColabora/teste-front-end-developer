angular.module('app')
    .filter('comma2decimal', [
        function() {
            return function(input) {
                var ret=(input)? input.toString().trim().replace(",","."):null
                return parseFloat(ret)
            }
        }
    ])
    .filter('decimal2comma', [
        function() {
            return function(input) {
                var ret=(input)? input.toString().replace(".",","):null
                if(ret){
                    var decArr=ret.split(",")
                    if(decArr.length>1){
                        var dec=decArr[1].length
                        if(dec===1){ret+="0"}
                    }
                }
                return ret
            }
        }
    ])