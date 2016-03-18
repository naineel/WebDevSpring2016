/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService){
        console.log("In the login controller");
        $scope.login = function (user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(loginCallback);
            console.log(user);
        };

        function loginCallback (user) {

            if (user != null) {
                $rootScope.newUser = user;
                $location.path('/profile');
            }
        }

    }

})();