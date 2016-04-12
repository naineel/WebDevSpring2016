/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("adminController", adminController);

    function adminController(UserService) {
        var vm = this;

        vm.remove = remove;
        vm.update = update;
        vm.add = add;
        vm.select = select;

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }

        init();

        function remove(user) {
            UserService
                .deleteUserById(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user) {
            UserService
                .updateUserA(user._id, user)
                .then(handleSuccess, handleError);
            vm.user = null;
        }

        function add(user) {
            UserService
                .createUserA(user)
                .then(handleSuccess, handleError);
            vm.user = null;
        }

        function select(user) {
            vm.user = angular.copy(user);
        }

        function handleSuccess(response) {
            console.log("This is the response from all users");
            console.log(response);
            vm.users = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();