/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function(){
   angular
       .module("FormBuilderApp")
       .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService){
        var vm = this;
        vm.registerUser = registerUser;

        function registerUser (user) {
            vm.message = null;
            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }

            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }

            if (!user.password || !user.password2) {
                vm.message = "Please provide a password";
                return;
            }

            if (user.password != user.password2) {
                vm.message = "Passwords must match";
                return;
            }

            console.log("user: " + user.username + " password: " + user.password);
            //UserService
            //    .findUserByCredentials(user.username, user.password)
            //    .then(callbackFunction);
            user.emails = user.emails.split(',');
            UserService
                .register(user)
                .then(
                    function(response) {
                        var user = response.data;
                        if(user != null) {
                            $rootScope.newUser = user;
                            $location.url("/profile");
                        }
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        //        .createUserA(user)
        //        .then(registerCallback);
        //    console.log(user);
        //}
        //
        //function registerCallback (user) {
        //    console.log("In RegisterController/ register callback function " + user);
        //    console.log(user.data);
        //    $rootScope.newUser = user.data;
        //    $location.path('/profile');
        }

        function callbackFunction(user) {
            if (user != null) {
                vm.message = "User already exists";
            }
        }

    }

})();