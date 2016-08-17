angular.module('app').factory('Auth', function () {
    var user

    return {
        setUser : function (aUser) {

            user = aUser
        },
        isLoggedIn : function () {
            return (user)? user: false
        },
        getUser : function () {
            return user
        }
    }
})