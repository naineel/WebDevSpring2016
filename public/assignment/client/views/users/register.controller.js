/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function(){
   angular
       .module("FormBuilderApp")
       .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService){
        $scope.registerUser = registerUser;

        function registerUser (user) {
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }

            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }

            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }

            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }

            console.log("user: " + user.username + " password: " + user.password);
            //UserService
            //    .findUserByCredentials(user.username, user.password)
            //    .then(callbackFunction);
            UserService
                .createUserA(user)
                .then(registerCallback);
            console.log(user);
        }

        function registerCallback (user) {
            console.log("In RegisterController/ register callback function " + user);
            console.log(user.data);
            $rootScope.newUser = user.data;
            $location.path('/profile');
        }

        function callbackFunction(user) {
            if (user != null) {
                $scope.message = "User already exists";
            }
        }

    }

})();