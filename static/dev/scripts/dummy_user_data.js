(function() {
    angular.module('app').service('Usuários', [ '$rootScope',
        'DADOS_USUARIOS', 'DEFAULT_STREAM',
        'LOGIN_COMMAND', 'LOGIN_SUCCESS', 'LOGIN_FAILURE',
        'REGISTER_COMMAND', 'REGISTRATION_SUCCESS', 'REGISTRATION_FAILURE',
        function ($rootScope, DADOS_USUARIOS, DEFAULT_STREAM,
                  LOGIN_COMMAND, LOGIN_SUCCESS, LOGIN_FAILURE,
                  REGISTER_COMMAND, REGISTRATION_SUCCESS, REGISTRATION_FAILURE) {

            var stream = dummy_service(DADOS_USUARIOS + DEFAULT_STREAM,
                REGISTER_COMMAND, REGISTRATION_SUCCESS, REGISTRATION_FAILURE,
                LOGIN_COMMAND, LOGIN_SUCCESS, LOGIN_FAILURE
            )

            stream.onMessage(function(message){
                var tx_response = JSON.parse(message)
                tx_response = tx_response.data // we're just going to throw away http stuff

                switch (tx_response.status) {
                    case LOGIN_SUCCESS:
                        $rootScope.$broadcast(LOGIN_SUCCESS, true) // https://github.com/angular/angular.js/issues/11213
                        break
                    case LOGIN_FAILURE:
                        $rootScope.$broadcast(LOGIN_FAILURE, tx_response.status)
                        break
                    case REGISTRATION_SUCCESS:
                        $rootScope.$broadcast(REGISTRATION_SUCCESS, true)
                        break
                    case REGISTRATION_FAILURE:
                        $rootScope.$broadcast(REGISTRATION_FAILURE, tx_response.status)
                        break
                }
            })

            return {
                send: function (command, message) {
                    console.log('sending command: ' + command)
                    stream.send(command, message)
                },
                close: function () {
                    stream.send(CLOSE)
                    stream=null
                }
            }
        }
    ])

    /**
     * The project implies a degree of session data, with details about transactions, but doesn't give write
     * access to the database. So I build a little dummy service for user accounts.
     *
     * The tx specifications is:
     * { command: command_processed,
     * status: txt message relating to success or failure,
     * reason: optional txt message with details about failure
     * }
     */
    var dummy_userRESTService = function (REGISTER_COMMAND, REGISTRATION_SUCCESS, REGISTRATION_FAILURE,
                                          LOGIN_COMMAND, LOGIN_SUCCESS, LOGIN_FAILURE) {
        var sf = {}
        sf[LOGIN_COMMAND] = {true: LOGIN_SUCCESS, false: LOGIN_FAILURE}
        sf[REGISTER_COMMAND] = {true: REGISTRATION_SUCCESS, false: REGISTRATION_FAILURE}

        return {
            users: [ {username: 'foo', password: 'bar'} ], // test user
            registerUser: function (user) {
                var reason
                var prefix = '[Socket] dummy_userRESTService.add - '
                if(!(('username' in user) && ('password' in user))) {
                    reason = 'invalid user credentials to add'
                    console.log(prefix + reason)
                    return {command: REGISTER_COMMAND, status: sf[REGISTER_COMMAND][false], reason: reason}
                }
                if(/^\S$/.test(user.username)) {
                    reason = ' empty username'
                    console.log(prefix + reason)
                    return {command: REGISTER_COMMAND, status: sf[REGISTER_COMMAND][false], reason: reason}
                }
                if(user.password.length === 0) {
                    reason = ' empty password'
                    console.log(prefix + reason)
                    return {command: REGISTER_COMMAND, status: sf[REGISTER_COMMAND][false], reason: reason}
                }
                if(this.existsUsername(user)) {
                    reason = 'duplicate user'
                    console.log(prefix + reason)
                    return {command: REGISTER_COMMAND, status: sf[REGISTER_COMMAND][false], reason: reason}
                }
                this.users.push( clone(user) ) // JSON, de util.js
                return {command: REGISTER_COMMAND, status: sf[REGISTER_COMMAND][true]}
            },
            existsUsername: function(user) {
                return (this.users.filter(function(v) { return v.username === user.username }).length > 0)
            },
            hasCredentials: function (user) {
                return {
                    command: LOGIN_COMMAND,
                    status: sf[LOGIN_COMMAND][(this.users.filter(function (v) {
                        return (v.username === user.username) && (v.password === user.password)
                    }).length > 0)]
                }
            }
        }
    }

    var dummy_service = function (uri, REGISTER_COMMAND, REGISTRATION_SUCCESS, REGISTRATION_FAILURE,
                                  LOGIN_COMMAND, LOGIN_SUCCESS, LOGIN_FAILURE) {
        return {
            self: this,
            uri: uri,
            message_handler: function () {},
            __dummy_userRESTService: dummy_userRESTService(
                REGISTER_COMMAND, REGISTRATION_SUCCESS, REGISTRATION_FAILURE,
                LOGIN_COMMAND, LOGIN_SUCCESS, LOGIN_FAILURE),
            __dummy_message: function(command, tx) {
                var user, tx_response
                switch (command){
                    case LOGIN_COMMAND:
                        user = JSON.parse(tx)
                        tx_response = this.__dummy_userRESTService.hasCredentials(user)
                        break
                    case REGISTER_COMMAND:
                        user = JSON.parse(tx)
                        tx_response = this.__dummy_userRESTService.registerUser(user)
                        break
                    default:
                        console.log('[Socket] dummy_$webSocket - invalid message type: ' + message)
                        return
                }
                var self = this
                setTimeout(function () {
                    self.receive(JSON.stringify({data: tx_response}))
                }, Math.random()*2 )
            },
            send: function (command, message) {
                this.__dummy_message(command, message)
            },
            receive: function(tx_response) {
                this.message_handler(tx_response)
            },
            onMessage: function(fun) {
                this.message_handler = fun
            }
        }
    }
})()