/**
 * Created by naineel on 2/22/16.
 */
"use strict";
//var _ = require("lodash");
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
        vm.sortByUsername = sortByUsername;
        vm.sortByFirstName = sortByFirstName;
        vm.sortByLastName = sortByLastName;

        function init() {
            setAllSortOrderToFalse();
            UserService
                .findAllUsers()
                .then(function (response) {
                    vm.users = response.data;
                }, handleError);
        }

        init();

        function remove(user) {
            console.log("remmove user");
            console.log(user._id);
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
            init();
            //vm.users = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }

        function sortByFirstName() {
            var allUsers = vm.users;
            allUsers = _.sortBy(allUsers, function(user) {
                return user.firstName;
            });
            if (vm.firstNameAscending) {
                _.reverse(allUsers);
                setAllSortOrderToFalse();
                vm.firstNameDescending = true;

            } else {
                setAllSortOrderToFalse();
                vm.firstNameAscending = true;
            }
            vm.users = allUsers;
        }

        function setAllSortOrderToFalse() {
            vm.usernameAscending = false;
            vm.usernameDescending = false;
            vm.firstNameAscending = false;
            vm.firstNameDescending = false;
            vm.lastNameAscending = false;
            vm.lastNameDescending = false;
        }

        function sortByLastName() {
            var allUsers = vm.users;
            allUsers = _.sortBy(allUsers, function(user) {
                return user.lastName;
            });
            if (vm.lastNameAscending) {
                _.reverse(allUsers);
                setAllSortOrderToFalse();
                vm.lastNameDescending = true;

            } else {
                setAllSortOrderToFalse();
                vm.lastNameAscending = true;
            }
            vm.users = allUsers;
        }

        function sortByUsername() {
            var allUsers = vm.users;
            allUsers = _.sortBy(allUsers, function(user) {
                return user.username;
            });
            if (vm.usernameAscending) {
                _.reverse(allUsers);
                setAllSortOrderToFalse();
                vm.usernameDescending = true;

            } else {
                setAllSortOrderToFalse();
                vm.usernameAscending = true;
            }
            vm.users = allUsers;
        }

    }
}());