/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService){
        var vm = this;
        console.log("In the login controller");
        //Event Handler declaration
        vm.login = login;
        vm.$location = $location;

        function login(user) {
            UserService
                .findUserByCredentialsA(user.username, user.password)
                .then(loginCallback);
            console.log(user);
        }

        function loginCallback (user) {
            console.log("Login Callback: ");
            console.log(user);
            if (user != null) {
                $rootScope.newUser = user.data;
                $location.path('/profile');
            } else {
                console.log("User is null");
            }
        }

    }

})();