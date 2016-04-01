/**
 * Created by naineel on 2/22/16.
 */
/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService){
        $scope.error = null;
        $scope.message = null;

        $scope.user = UserService.getCurrentUser();
        if ($rootScope.newUser == null) {
            $location.url("/home");
        }

        $scope.update = update;

        function update(user) {
            $scope.error = null;
            $scope.message = null;
            UserService
                .updateUserA(user._id, user)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        $scope.message = "User updated successfully";
                        UserService.setCurrentUserA(user);
                        $scope.user = user;
                    } else {
                        $scope.message = "Unable to update the user";
                    }
                });
        }

    }

})();