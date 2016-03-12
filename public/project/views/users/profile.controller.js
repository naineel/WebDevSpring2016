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

    function ProfileController($scope, $location, UserService){
        $scope.error = null;
        $scope.message = null;

        $scope.user = UserService.getCurrentUser();
        if (!$scope.user) {
            $location.url("/home");
        }

        $scope.update = update;

        function update (user) {
            $scope.error = null;
            $scope.message = null;
            UserService.updateUser(user._id, user, updatedProfileCallback)
        }


        function updatedProfileCallback (user) {
            if (user) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser(user);
            } else {
                $scope.message = "Unable to update the user";
            }
        }

    }

})();