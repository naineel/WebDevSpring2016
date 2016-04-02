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

    function ProfileController ($rootScope, $location, UserService) {
        var vm = this;
        vm.error = null;
        vm.message = null;

        vm.user = UserService.getCurrentUser();
        if ($rootScope.newUser == null) {
            $location.url("/home");
        }

        vm.update = update;

        function update(user) {
            vm.error = null;
            vm.message = null;
            UserService
                .updateUserA(user._id, user)
                .then(function updatedProfileCallback(response) {
                    if (response.status == 200) {
                        UserService.setCurrentUserA(user);
                        vm.user = user;
                        vm.message = "User updated successfully";
                    } else {
                        vm.message = "Unable to update the user";
                    }
                });
        }

    }

})();