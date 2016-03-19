/**
 * Created by naineel on 2/22/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        var service = {
            findUserByCredentials : findUsersByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser:updateUser,
            getCurrentUser : getCurrentUser,
            setCurrentUser : setCurrentUser,
            findUserByUsername : findUserByUsername
        };

        return service;

        function findUsersByCredentials(username, password)
        {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);

        }

        function findAllUsers()
        {
            return $http.get("/api/assignment/user");
        }

        function createUser(user)
        {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userid) {
            return $http.delete("/api/assignment/user/" + userid);
        }

        function updateUser(userId, user)
        {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function getCurrentUser() {
            return $rootScope.newUser;
        }

        function setCurrentUser (user) {
            $rootScope.newUser = user;
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

    }
})();
