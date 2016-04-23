/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var vm = this;
        console.log("In the login controller");
        //Event Handler declaration
        vm.login = login;
        vm.$location = $location;

        function login(user) {
            if (user) {
                UserService
                    .login({
                        username: user.username,
                        password: user.password
                    })
                    .then(
                        function(response) {
                            $rootScope.newUser = response.data;
                            $location.url('/profile');
                        },
                        function(err) {
                            vm.error = err;
                        }
                    );
            }

        }

    }

})();