/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService){
        console.log("In the login controller");

        var vm = this;

        vm.login = login;

        function init() {
            console.log("Login controller init");
        }

        init();

        function login(user) {
            console.log("Login function login controller");
            if(!user) {
                return;
            }
            UserService
                .login({username: user.username, password: user.password})
                .then(function(response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }

    }

})();