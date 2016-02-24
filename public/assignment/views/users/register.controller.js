/**
 * Created by naineel on 2/22/16.
 */
(function(){
   angular
       .module("FormBuilderApp")
       .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope){
        //$scope.register() = ""

        $scope.registerUser = function(user) {
            //$scope.user = user;
            var newUser = {
                username: user.name,
                password: user.password,
                email: user.email
            };
            $rootScope.newUser = newUser;
            console.log(user);
            console.log("Im in register controller");
        }

    }

})();